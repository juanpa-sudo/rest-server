const express = require("express");
const app = express();

app.use(require("./usuarios"));
app.use(require("./login"));
app.use(require("./categoria"));
app.use(require("./producto"));

module.exports = app;
