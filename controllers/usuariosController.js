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

  // crear el usuario
  await Usuarios.create({
    email,
    password
  });

  res.redirect('/iniciar-sesion')
}