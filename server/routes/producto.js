const express = require("express");
const {
  createProduct,
  listProduct,
  editProduct,
  deleteProduct,
  listProductUnique,
  searchProduct,
} = require("../controller/ProductoController");
const { validarToken } = require("../middlewares/authetication");
const app = express();

app.post("/producto", validarToken, createProduct);
app.get("/producto", validarToken, listProduct);
app.get("/producto/:id", validarToken, listProductUnique);
app.put("/producto/:id", validarToken, editProduct);
app.delete("/producto/:id", validarToken, deleteProduct);

app.get("/producto/buscar/:termino", validarToken, searchProduct);

module.exports = app;
