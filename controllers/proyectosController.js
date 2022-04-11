// Importar los modelos
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.proyectosHome = async (req, res) => {
  console.log(res.locals.usuario);
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
    await Proyectos.create({ nombre });
    res.redirect('/')
  }
}

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url // es req.params. y el nombre q tenga en la ruta, en este caso url
    }
  });

  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

  // Consultar tareas del Proyecto Actual
  // console.log(proyecto);
  const tareas = await Tareas.findAll({
    where: {
      proyectoId: proyecto.id
    },
    // ventaja del ORM podemos incluir el objeto completo
    // aqui incluimos el proyecto
    // mira en la vista tarea ==> vardump(tareas)
    // include: [
    //   { model: Proyectos }
    // ]
  });

  // console.log(tareas);

  if(!proyecto) return next();

  // console.log(proyecto);

  // Render la vista
  res.render('tareas', {
    nombrePagina: 'Tareas del Proyecto',
    proyectos,
    proyecto,
    tareas
  })
}

exports.formularioEditar = async (req, res) => {
  const proyectosPromise = Proyectos.findAll();
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id
    }
  });

  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

  // Render la vista
  res.render('nuevoProyecto', {
    nombrePagina: 'Editar Proyecto',
    proyectos,
    proyecto
  })
}

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyectos.findAll();
  // Enviar a la consola lo que el usuario escriba
  // console.log(req.body);

  // Validar q tengamos algo en el input lo buscamos por el name
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
    await Proyectos.update(
      { nombre: nombre },
      { where: { id: req.params.id }}
      );
    res.redirect('/')
  }
}

exports.eliminarProyecto = async (req, res, next) => {
  // podemos usar query o params
  // console.log(req.params); // viene de la ruta
  // console.log(req.query); // viene de axios

  const {urlProyecto} = req.query;
  const resultado = await Proyectos.destroy({ where: { url: urlProyecto }});

  if(!resultado) { // si por algun casual no se pudo borrar, pq se perdio la conexion o lo q sea.
    return next();
  }

  res.status(200).send("Proyecto Eliminado Corectamente");
}
