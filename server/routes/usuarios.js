const express = require("express");
const {
  createUser,
  updateUser,
  getUsario,
  deleteUsuario,
} = require("../controller/UserController");
const {
  validarToken,
  verifyAdmin_role,
} = require("../middlewares/authetication");
const app = express();

app.get("/usuario", validarToken, getUsario);

app.post("/usuario", [validarToken, verifyAdmin_role], createUser);

app.put("/usuario/:id", [validarToken, verifyAdmin_role], updateUser);

app.delete("/usuario/:id", [validarToken, verifyAdmin_role], deleteUsuario);

module.exports = app;
