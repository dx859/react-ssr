const fs = require("fs");
const path = require("path");
const express = require("express");
const ReactDOMServer = require("react-dom/server");
const paths = require("../config/paths");
const serverEntry = require("../dist/server-entry");

const app = express();
const template = fs.readFileSync(
  path.join(paths.appBuild, "index.html"),
  "utf8"
);
app.use("/public", express.static(paths.appBuild));

app.get("*", function(req, res) {
  const appString = ReactDOMServer.renderToString(serverEntry);
  res.send(template.replace("<!-- appString -->", appString));
});

app.listen(3200, function() {
  console.log("server start http://localhost:3200");
});
