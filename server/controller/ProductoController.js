const Producto = require("../models/Producto");

function listProduct(req, res) {
  let inicio = req.query.inicio || 0;
  let final = req.query.final || 5;

  inicio = Number(inicio);
  final = Number(final);

  Producto.find({ disponible: true }, (err, productoBD) => {
    if (err) return res.status(400).json({ ok: false, err });

    Producto.countDocuments({ disponible: true }, (err, count) => {
      if (err) return res.status(400).json({ ok: false });
      return res.json({ ok: true, producto: productoBD, count });
    });
  })
    .skip(inicio)
    .limit(final)
    .populate("categoria", "nombre")
    .populate("usuario", "nombre")
    .exec();
}

function createProduct(req, res) {
  let body = req.body;
  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precioUni,
    categoria: body.categoria,
    usuario: req.data._id,
  });

  producto.save((err, productoBD) => {
    if (err) return res.status(400).json({ ok: false, err });
    return res.json({
      ok: false,
      producto: productoBD,
    });
  });
}

function editProduct(req, res) {
  let body = req.body;
  let id = req.params.id;

  Producto.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, productoBD) => {
      if (err) return res.status(400).json({ ok: false, err });

      return res.json({ ok: true, producto: productoBD });
    }
  );
}
function deleteProduct(req, res) {
  let id = req.params.id;
  let stado = { disponible: false };
  Producto.findByIdAndUpdate(id, stado, { new: true }, (err, productoBD) => {
    if (err) return res.status(400).json({ ok: false, err });

    return res.json({ ok: true, producto: productoBD });
  });
}

function listProductUnique(req, res) {
  let id = req.params.id;
  Producto.findById(id, (err, productoBD) => {
    if (err) return res.status(400).json({ ok: false, err });
    return res.json({ ok: true, producto: productoBD });
  });
}

function searchProduct(req, res) {
  let termino = req.params.termino;

  let regexp = new RegExp(termino, "i");

  Producto.find({ nombre: regexp }, (err, productoBD) => {
    if (err) return res.status(400).json({ ok: false, err });

    return res.json({ ok: false, producto: productoBD });
  })
    .populate("categoria")
    .exec();
}

module.exports = {
  createProduct,
  listProduct,
  editProduct,
  deleteProduct,
  listProductUnique,
  searchProduct,
};
