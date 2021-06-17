const express = require("express");
const { loginUser, google } = require("../controller/UserController");
const app = express();

app.post("/login", loginUser);
app.post("/google", google);
module.exports = app;
