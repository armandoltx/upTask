const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al Modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

// local strategy - Login con credenciales propias (usuario y password)
passport.use(
  new LocalStrategy(
    // por default passport espera un usuario y un password
    {
      usernameField: 'email',
      paswordField: 'pasword'
    },
    async (email, password, done) => {
      // puede q el ussuario introduzca un email q no existe para eso necesitamos un try catch
      try {
        const usuario = await Usuarios.find({
          where: {email: email}
        });
        // El usuario existe, pero password es incorrecto
        if(!usuario.verificarPassword(password)) {
          return done(null, false, {
            // message es una palabra q viene de passport, no se puede usar otra
            message: 'El Password introducido es incorrecto.'
          })
        }

        // Si el email existe y el pass es correcto
        return(null, usuario);

      } catch (error) {
          // ese usuario no existe
          // done toma 3 parametros, el erroe, el usuario y las opciones.
          return done(null, false, {
            // message es una palabra q viene de passport, no se puede usar otra
            message: 'Esa cuenta no existe'
          })
      }
    }
  )
);

// El usuario es un objeto q contiene id, email, password....
//entonces tenemos q serializar el objeto usuario y deserializar el usuario

//serializar el objeto usuario
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

// exportat

module.exports = passport;