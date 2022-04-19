// AuthController.js
const passport = require('passport');
const crypto = require('crypto');
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

exports.resetPassword = async (req, res) => {
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