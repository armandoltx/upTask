// importing express similar to import express from 'express'
const express = require('express');
const router = express.Router();

// importar express-validator para validaciones
const { body } = require('express-validator/check');

// importamos el controlador
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');


//--------------- Proyectos --------------
//----------------------------------------
// to export stuff in node, similar to export default ....
module.exports = function() {
  // ruta para el home
  router.get('/',
    authController.usuarioAutenticado,
    proyectosController.proyectosHome
  );

  router.get('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto
  );
  router.post('/nuevo-proyecto',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  // Listar proyecto
  router.get('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl
  );

  // Actualizar el Proyecto
  router.get('/proyecto/editar/:id',
    authController.usuarioAutenticado,
    proyectosController.formularioEditar
  );

  router.post('/nuevo-proyecto/:id',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  // Eliminar Proyecto
  router.delete('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto
  );

  //-------------- Tareas ----------------
  //----------------------------------------
  router.post('/proyectos/:url',
    authController.usuarioAutenticado,
    tareasController.agregarTarea
  );

  // Actualizar tarea
  // Usamos patch en vez de put, pq solo queremos cambiar un campor del registro.
  router.patch('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
  );

  // Eliminar Tarea
  router.delete('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.eliminarTarea
  );

  //-------------- Usuarios ----------------
  //----------------------------------------

  // Crear cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);

  // Iniciar sesion
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
  router.post('/iniciar-sesion', authController.autenticarUsuario);

  // Cerrar Sesion
  router.get('/cerrar-sesion', authController.cerrarSesion);

  return router;
}