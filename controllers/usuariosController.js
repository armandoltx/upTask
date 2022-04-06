// Importar los modelos
const Usuarios = require('../models/Usuarios');


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

    res.redirect('/iniciar-sesion')
  } catch (error) {
    // console.log(error);
    res.render('crearCuenta', {
      rerror: error.errors,
      nombrePagina: 'Crear Cuenta'
    });
  }
}