// Importar los modelos
const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');


exports.formCrearCuenta = (req, res) => {
  // res.send('funciona');
  res.render('crearCuenta', {
    nombrePagina: 'Crear Cuenta'
  });
}

exports.crearCuenta = async (req, res, next) => {
  // res.send('Creaste la cuenta');

  // leer los datos
  // console.log(req.body);
  const { email, password } = req.body;

  // usa try catch para acceder a los errores, por ejemplo aqui si hay un email duplicado arroja un error
  // que podemos pasar a la vista
  try {
    // crear el usuario
    await Usuarios.create({
      email,
      password
    });

    // Crear URL para confirmar usuario
    const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
    console.log(confirmarUrl);

    // Crear el objeto de usuario para la configuracion del email
    const usuario = {
      email
    }
    // Enviar email
    await enviarEmail.enviar({
      usuario,
      subject: 'Confirma tu cuenta UpTask',
      confirmarUrl,
      archivo: 'confirmar-cuenta'
    });

    //Redirigir al usuario
    req.flash('correcto', 'Enviamos un correo, confirma tu cuenta')
    res.redirect('/iniciar-sesion')

  } catch (error) {
    // console.log(error);

    //en flash lo q pasamos es la categoria del error, en este caso error
    req.flash('error', error.errors.map(error => error.message))

    res.render('crearCuenta', {
      mensajes: req.flash(),
      nombrePagina: 'Crear Cuenta',
      email,
      password
    });
  }
}

exports.formIniciarSesion = (req, res) => {
  // res.send('funciona');
  // console.log(res.locals.mensajes);
  const { error } = res.locals.mensajes;
  res.render('iniciarSesion', {
    nombrePagina: 'Iniciar Sesion',
    error
  });
}


exports.formReestablecerPassword = (req, res)  => {
  // res.send('funciona');
  res.render('reestablecer', {
    nombrePagina: 'Reestablecer Password',
  })
}