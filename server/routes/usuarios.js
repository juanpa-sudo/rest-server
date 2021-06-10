const express = require("express");
const { createUser, updateUser, getUsario, deleteUsuario } = require("../controller/UserController");
const app = express();

app.get("/usuario", getUsario);

app.post("/usuario", createUser);

app.put("/usuario/:id",updateUser);

app.delete("/usuario/:id",deleteUsuario);

module.exports = app;
