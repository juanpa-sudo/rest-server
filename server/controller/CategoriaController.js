const Categorias = require("../models/Categorias");

function listCoffe(req, res) {
  Categorias.find({})
    .populate("usuario", "nombre")
    .exec((err, categoriaDB) => {
      if (err) return res.status(400).json({ ok: false, err });

      Categorias.countDocuments({}, (err, count) => {
        if (err) return res.status(400).json({ ok: false, err });

        return res.json({ ok: true, categoria: categoriaDB, count });
      });
    });
}

function createCategoria(req, res) {
  let body = req.body;
  let id = req.data._id;
  const categoria = new Categorias({ nombre: body.nombre, usuario: id });

  categoria.save((err, categoriaDB) => {
    if (err) return res.status(400).json({ ok: false, err });

    return res.json({ ok: true, categoria: categoriaDB });
  });
}

function listCategoria(req, res) {
  let id = req.params.id;

  Categorias.findById(id, (err, categoriaDB) => {
    if (err) return res.status(400).json({ ok: false, err });

    return res.json({ ok: true, categoria: categoriaDB });
  })
    .populate("usuario", "nombre")
    .exec();
}

function editCategoria(req, res) {
  let id = req.params.id;
  let body = req.body;
  console.log(body);
  Categorias.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, categoriaDB) => {
      if (err) return res.status(400).json({ ok: false, err });

      return res.json({ ok: true, categoria: categoriaDB });
    }
  );
}
function deleteCategoria(req, res) {
  let id = req.params.id;
  Categorias.findByIdAndDelete(id, (err, categoriaDB) => {
    if (err) return res.status(400).json({ ok: false, err });

    return res.json({ ok: false, categoria: categoriaDB });
  });
}
module.exports = {
  createCategoria,
  listCoffe,
  listCategoria,
  editCategoria,
  deleteCategoria,
};
