const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolValido={
	values:['ADMIN_ROLE', 'USER_ROLE'],
	message:'{VALUE} no es valido para el rol'
}

let Schema = mongoose.Schema;

let usurioSchema = new Schema({
	nombre: {
		type: String,
		required: [true, "El nombre es necesario"],
	},
	email: {
		type: String,
		required: [true, "El correo es obligatorio"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatorio"],
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		default: "USER_ROLE",
		enum:rolValido
	},
	estado: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});
usurioSchema.methods.toJSON=function () {
	let user=this;
	let userObject=user.toObject();
	delete userObject.password;

	return userObject;
}
usurioSchema.plugin(uniqueValidator, {
	message: "Error, {PATH} La direccion del correo debe ser unico.",
});

module.exports = mongoose.model("Usuarios", usurioSchema);
