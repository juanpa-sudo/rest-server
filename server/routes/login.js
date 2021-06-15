const express = require("express");
const { loginUser } = require("../controller/UserController");
const app = express();

app.post("/login", loginUser);

module.exports = app;
