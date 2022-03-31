// importing express similar to import express from 'express'
const express = require('express');
const router = express.Router();

// importar express-validator para validaciones
const { body } = require('express-validator/check');

// importamos el controlador
const proyectosController = require('../controllers/proyectosController');

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

  return router;
}