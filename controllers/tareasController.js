// Importar los modelos
const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async (req, res, next) => {
  // res.send("enviado");

  // === Obtenemos el proyecto actual
  // console.log(req.params.url);
  const proyecto = await Proyectos.findOne({
    where: { url:  req.params.url }
  });

  // console.log(proyecto);

  // === Leer el valor del input
  // console.log(req.body); se trae el valor del name del input
  const {tarea} = req.body;

  // Estado 0 = incompleto y ID del proyecto
  const estado = 0;
  const proyectoId = proyecto.id;

  // === Insertar en la BD
  const resultado = await Tareas.create({tarea, estado, proyectoId});

  // === Redireccionar
  if(!resultado) {
    return next();
  }

  res.redirect(`/proyectos/${req.params.url}`)

}

exports.cambiarEstadoTarea = async (req, res, next) => {
  //res.send('todo bien');
  // podemos usar query o params
  //  console.log(req.params); // viene de la ruta
  // console.log(req.query); // viene de axios pero no funciona

  const { id } = req.params;
  // console.log(id);
  const tarea = await Tareas.findOne({ where: { id }});
  // console.log(tarea);

  // cambiar el estado
  let estado = 0;
  if(tarea.estado === estado) {
    estado = 1;
  }
  tarea.estado = estado;

  const resultado = await tarea.save();
  if(!resultado) return next();
  res.status(200).send("estado de la tarea Actualizado");
}