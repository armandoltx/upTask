// importing express similar to import express from 'express'
const express = require('express');
const router = express.Router();

// importar express-validator para validaciones
const { body } = require('express-validator/check');

// importamos el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');


//--------------- Proyectos --------------
//----------------------------------------
// to export stuff in node, similar to export default ....
module.exports = function() {
  // ruta para el home
  router.get('/', proyectosController.proyectosHome);

  router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
  router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  // Listar proyecto
  router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

  // Actualizar el Proyecto
  router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
  router.post('/nuevo-proyecto/:id',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  // Eliminar Proyecto
  router.delete('/proyectos/:url', proyectosController.eliminarProyecto);

  //-------------- Tareas ----------------
  //----------------------------------------
  router.post('/proyectos/:url', tareasController.agregarTarea);

  // Usamos patch en vez de put, pq solo queremos cambiar un campor del registro.
  router.patch('/tareas/:id', tareasController.cambiarEstadoTarea);

  // Eliminar Tarea
  router.delete('/tareas/:id', tareasController.eliminarTarea);

  //-------------- Usuarios ----------------
  //----------------------------------------

  //Crear cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);




  return router;
}