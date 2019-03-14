const path = require("path");
const vm = require("vm");
const NativeModule = require("module");
const axios = require("axios");
const webpack = require("webpack");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactDOMServer = require("react-dom/server");
const ejs = require("ejs");
const paths = require("../../config/paths");
const serverRender = require("./server-render");
const matchRoutes = require("react-router-config").matchRoutes;
const config = require("../config");

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
      target: config.apiPrefix,
      pathRewrite: { "^/api": "" },
      changeOrigin: true
    })
  );

  app.use("/:tenant", function(req, res, next) {
    if (!serverBundle) {
      return res.send("waiting for compile");
    }
    getTemplate().then(template => {
      const { createApp, getServerStore, routes } = serverBundle;

      const store = getServerStore(config.apiPrefix, req.params.tenant);
      const matchedRoutes = matchRoutes(routes, req.originalUrl);

      const promises = [];
      matchedRoutes.forEach(item => {
        if (item.route.loadData) {
          const promise = new Promise(resolve => {
            item.route
              .loadData(store)
              .then(resolve)
              .catch(resolve);
          });
          promises.push(promise);
        }
      });

      Promise.all(promises)
        .then(() => {
          const routerContext = {};
          try {
            let app = createApp(req.originalUrl, store, routerContext);
            let content = ReactDOMServer.renderToString(app);
            if (routerContext.action === "REPLACE") {
              res.redirect(routerContext.url);
              return;
            }

            res.send(
              serverRender(template, {
                content,
                initialState: JSON.stringify(store.getState())
              })
            );
          } catch (e) {
            console.log(e);
            res.send(
              serverRender(template, {
                initialState: JSON.stringify(store.getState())
              })
            );
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
  });
};
