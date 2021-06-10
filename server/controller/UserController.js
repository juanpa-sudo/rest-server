const Usuario = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require('underscore');

function getUsario(req,res) {
	let limite=req.query.limite;
	limite=Number(limite);
	
	let desde=req.query.desde;
	desde=Number(desde);

	Usuario.find({estado:true},'nombre email role estado google').limit(limite).skip(desde)
	.exec((err,usuarioDB)=>{
		if (err) {
			return res.status(400).json({
					ok:false,
				err})
		}
		Usuario.count({estado:true},(err,count)=>{
			if (err) {
				return res.status(400).json({
					ok:false,
				err})
			}
			
			res.json({
				ok:true,
				usuarioDB,
				count
			})
		})
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
function updateUser(req,res) {
	let id = req.params.id;
	let body=_.pick(req.body,['nombre','email','img','role','estado'])
	
	Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,baseDB)=>{
		if (err) {
			return res.status(400).json({
				ok: false,
				err,
			});
		}
		return res.json(baseDB);
	})
}
function deleteUsuario(req,res) {
	let id=req.params.id;
	let estado={estado:false}
	// ELiminar el suario fisicamente

	// Usuario.findByIdAndDelete(id,(err,UsuarioDB)=>{
	// 	if(err){
	// 		return res.status(400).json({ok:false,err})
	// 	}
	// 	if(!UsuarioDB) res.status(400).json({ok:false,err:'Usuario ya estaba eliminado'})

	// 	res.json({
	// 		UsuarioDB
	// 	})
	// })

	Usuario.findByIdAndUpdate(id,estado,{new:true},(err,UsuarioDB)=>{
		if (err) return res.status(400).json({ok:false,err})
		
		res.json({ok:true,
		UsuarioDB})
	})
}
module.exports = { createUser,updateUser,getUsario,deleteUsuario };