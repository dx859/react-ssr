const path = require("path");
const vm = require("vm");
const NativeModule = require("module");
const axios = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDOMServer = require("react-dom/server");
const asyncBootstrap = require("react-async-bootstrapper");
const ejs = require("ejs");
const paths = require("../../config/paths");

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://127.0.0.1:8888/public/server.ejs")
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
      appString = "";
      const { createApp, getServerStore } = serverBundle;
      const store = getServerStore();
      const routerContext = {};
      try {
        let app = createApp(req.originalUrl, store, routerContext);

        asyncBootstrap(app).then(() => {
          if (routerContext.action === "REPLACE") {
            res.redirect(routerContext.url);
            return;
          }

          content = ReactDOMServer.renderToString(app);
          const html = ejs.render(template, {
            appString: content,
            initialState: JSON.stringify(store.getState()),
            meta: "", //helmet.meta.toString(),
            title: "", // helmet.title.toString(),
            style: "", // helmet.style.toString(),
            link: "", //helmet.link.toString(),
            materialCss: "" // sheetsRegistry.toString()
          });
          res.send(html);
          return;
        });
      } catch (e) {
        console.log(e);
      }
      const html = ejs.render(template, {
        appString: "",
        initialState: JSON.stringify(store.getState()),
        meta: "", //helmet.meta.toString(),
        title: "", // helmet.title.toString(),
        style: "", // helmet.style.toString(),
        link: "", //helmet.link.toString(),
        materialCss: "" // sheetsRegistry.toString()
      });
      res.send(html);
    });
  });
};
