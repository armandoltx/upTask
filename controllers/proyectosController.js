// Importar los modelos
const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req, res) => {
  res.render('index',{
    nombrePagina : 'Proyectos'
  });
}

exports.formularioProyecto = (req, res) => {
  res.render('nuevoProyecto',{
    nombrePagina : 'Nuevo Proyecto'
  });
}

exports.nuevoProyecto = async (req, res) => {
  // Enviar a la consola lo que el usuario escriba
  // console.log(req.body);

  // Validar q tengamos algo en el input
  const { nombre } = req.body;

  let errores =[];

  if(!nombre) {
    errores.push({'texto' : 'Agrega un nombre al Proyecto'})
  }

  // si hay errores
  if(errores.length > 0) {
    res.render('nuevoProyecto', {
      nombrePagina : 'Nuevo Proyecto',
      errores
    })
  } else {
    // No hay errores
    // Instertar en la BD.
    const proyecto = await Proyectos.create({ nombre });
    res.redirect('/')
  }
}
