// AuthController.js
const passport = require('passport');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const bcrypt = require('bcrypt-nodejs');
const Usuarios = require('../models/Usuarios');

// autenticar el usuario
exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash : true,
  badRequestMessage: 'Ambos Campos son Obligatorios'
});


// Revisar si el usuario esta logged in

exports.usuarioAutenticado = (req, res, next) => {
  // si esta autenticado q siga navegando
  // gracias a passport:
  if(req.isAuthenticated()) {
    return next();
  }

  // sino esta autenticado redirigir al formulario
  return res.redirect('/iniciar-sesion');
}

// Cerrar Sesion
exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion') // lleva a login
  });
}

// Genera token si el usuario es valido
exports.enviarToken = async (req, res) => {
  // res.send('funciona');

  // Verificar q el Usuario existe
  // email es pq es como lo llamamos en el formulario, es decir, el "name"
  const {email} = req.body;
  const usuario = await Usuarios.findOne({ where: { email } })

  // Si no existe el usuario
  if(!usuario) {
    req.flash('error', 'No existe el Usuario.');
    res.redirect('/reestablecer');
  }

  // Si el usuario existe
  // const token = crypto.randomBytes(20).toString('hex');
  // console.log(token);
  // const expiracion = Date.now() + 3600000;
  // console.log(expiracion);

  usuario.token = crypto.randomBytes(20).toString('hex');
  usuario.expiracion = Date.now() + 3600000;

  // Guardar los datos en la BD.
  await usuario.save();

  // url de reset
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
  console.log(resetUrl);
}

exports.validarToken = async (req, res) => {
  // console.log(req.params.token);
  // res.json(req.params.token);
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token
    }
  });
  console.log(usuario);

  // si no hay usuario
  if(!usuario) {
    req.flash('error', 'Usuario no Valido.');
    res.redirect('/reestablecer');
  }

  // si hay usuario, Formulario para generar el password
  res.render('resetPassword', {
    nombrePagina: 'Reestablecer Password'
  })
}

// cambia el password por uno nuevo

exports.actualizarPassword = async (req, res) => {
  // console.log(req.params.token);

  // verifica el token valido per tb la fecha de expiracion
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gte] : Date.now()
      }
    }
  });

  // verificamos si el usuario existe
  // console.log(usuario);
  if(!usuario) {
    req.flash('error', 'Usuario no Valido.');
    res.redirect('/reestablecer');
  }

  // si el usuario existe guardamos el nuevo password, pero antes se hashea

  // se pasa req.body.password pq password viene del formulario en resetPassword el name del input es password
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  // ya estos no hacen falta
  usuario.token = null;
  usuario.expiracion = null;

  // guardamos el nuevo password
  await usuario.save();

  req.flash('correcto', 'Tu password se ha modificado correctamente');
  res.redirect('/iniciar-sesion');

}