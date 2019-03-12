const path = require("path");
const vm = require("vm");
const NativeModule = require("module");
const axios = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDOMServer = require("react-dom/server");
const paths = require("../../config/paths");

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://127.0.0.1:8888/public/index.html")
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};
let serverBundle;
const serverConfig = require(path.join(paths.appPath, "config/webpack.server"));

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );

  const m = { exports: {} };
  try {
    const bundle = mfs.readFileSync(bundlePath, "utf-8");
    const wrapper = NativeModule.wrap(bundle);
    const script = new vm.Script(wrapper, {
      filename: "server-entry.js",
      displayErrors: true
    });
    const result = script.runInThisContext();
    result.call(m.exports, m.exports, require, m);
    serverBundle = m.exports;
  } catch (e) {
    console.log(e.stack);
  }
});

module.exports = function(app) {
  app.use(
    "/public",
    proxy({
      target: "http://127.0.0.1:8888",
      changeOrigin: true
    })
  );
  app.use(
    "/api",
    proxy({
      target: "http://cg-test.myyscm.com/bms/index.php",
      pathRewrite: { "^/api": "" },
      changeOrigin: true
    })
  );

  app.use("/:tenant", function(req, res, next) {
    if (!serverBundle) {
      return res.send("waiting for compile");
    }
    getTemplate().then(template => {
      const createApp = serverBundle.default;
      const context = {tenant: req.params.tenant}

      let appString = "";
      try {
        appString = ReactDOMServer.renderToString(createApp(req.originalUrl, context));
      } catch (e) {
        console.log(e)
      }
      res.send(template.replace("<!-- appString -->", appString));
    });
  });
};
