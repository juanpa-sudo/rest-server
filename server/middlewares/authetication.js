const jwt = require("jsonwebtoken");
let validarToken = (req, res, next) => {
  let token = req.get("Authorization");

  jwt.verify(token, process.env.SEED_TOKEN, (err, decode) => {
    if (err) return res.status(401).json({ ok: "false", err });

    req.data = decode.data;
    next();
  });
};

let verifyAdmin_role = (req, res, next) => {
  if (req.data.role === "USER_ROLE") {
    return res.status(401).json({
      ok: false,
      err: " Acion no autorizada",
    });
  }
  next();
};

module.exports = { validarToken, verifyAdmin_role };
