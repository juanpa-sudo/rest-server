const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre debe ser requerido"],
    unique: true,
  },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuarios" },
});

categoriaSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Categoria", categoriaSchema);
