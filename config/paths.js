const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp("."),
  serverPath: resolveApp("server"),
  indexPath: resolveApp("client/index.js"),
  serverEntryPath: resolveApp("client/server-entry.js"),
  serverBuildPath: resolveApp("dist/server-entry.js"),
  appBuild: resolveApp("dist"),
  appTemplate: resolveApp("client/template.html"),
  appServerTemplate: resolveApp("client/server.template.ejs")
};
