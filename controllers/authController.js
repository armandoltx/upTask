// AuthController.js
const passport = require('passport');

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