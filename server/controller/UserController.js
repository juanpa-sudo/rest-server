const Usuario = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");

function getUsario(req, res) {
  return res.json({
    usuario: req.data,
    nombre: req.data.nombre,
    email: req.data.email,
  });

  let limite = req.query.limite;
  limite = Number(limite);

  let desde = req.query.desde;
  desde = Number(desde);

  Usuario.find({ estado: true }, "nombre email role estado google")
    .limit(limite)
    .skip(desde)
    .exec((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.countDocuments({ estado: true }, (err, count) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }

        res.json({
          ok: true,
          usuarioDB,
          count,
        });
      });
    });
}

function createUser(req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    estado: body.estado,
    google: body.google,
  });
  usuario.save((err, baseDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    return res.json({
      usuario: baseDB,
    });
  });
}
function updateUser(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, baseDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      return res.json(baseDB);
    }
  );
}
function deleteUsuario(req, res) {
  let id = req.params.id;
  let estado = { estado: false };
  // ELiminar el suario fisicamente

  Usuario.findByIdAndUpdate(id, estado, { new: true }, (err, UsuarioDB) => {
    if (err) return res.status(400).json({ ok: false, err });

    res.json({ ok: true, UsuarioDB });
  });
}

function loginUser(req, res) {
  let body = req.body;
  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) return res.status(500).json({ ok: false, err });

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: { message: "(Usuario) o contraseña incorrecta" },
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: { message: "Usuario o (contraseña) incorrecta" },
      });
    }

    let token = jwt.sign({ data: usuarioDB }, process.env.SEED_TOKEN, {
      expiresIn: process.env.CAUCIDAD_TOKEN,
    });

    res.json({
      ok: true,
      usuarioDB,
      token,
    });
  });
}
module.exports = {
  createUser,
  updateUser,
  getUsario,
  deleteUsuario,
  loginUser,
};
