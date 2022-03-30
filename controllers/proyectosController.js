// Importar los modelos
const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyectos.findAll();

  res.render('index',{
    nombrePagina : 'Proyectos',
    proyectos
  });
}

exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  res.render('nuevoProyecto',{
    nombrePagina : 'Nuevo Proyecto',
    proyectos
  });
}

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
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
      proyectos,
      errores
    })
  } else {
    // No hay errores
    // Instertar en la BD.
    const proyecto = await Proyectos.create({ nombre });
    res.redirect('/')
  }
}

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectos = await Proyectos.findAll();
  const proyecto = await Proyectos.findOne({
    where: {
      url: req.params.url // es req.params. y el nombre q tenga en la ruta, en este caso url
    }
  });

  if(!proyecto) return next();

  // console.log(proyecto);

  // Render la vista
  res.render('tareas', {
    nombrePagina: 'Tareas del Proyecto',
    proyectos,
    proyecto
  })
}
