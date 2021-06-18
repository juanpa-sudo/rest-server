const express = require("express");
const {
  createCategoria,
  listCoffe,
  listCategoria,
  editCategoria,
  deleteCategoria,
} = require("../controller/CategoriaController");
const {
  validarToken,
  verifyAdmin_role,
} = require("../middlewares/authetication");
const app = express();

app.post("/crear-categoria", [validarToken, verifyAdmin_role], createCategoria);
app.get("/categorias", validarToken, listCoffe);
app.get("/categoria/:id", validarToken, listCategoria);
app.put("/categoria/:id", [validarToken, verifyAdmin_role], editCategoria);
app.delete("/categoria/:id", [validarToken, verifyAdmin_role], deleteCategoria);

module.exports = app;
