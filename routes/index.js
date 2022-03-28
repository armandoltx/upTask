// importing express similar to import express from 'express'
const express = require('express');
const router = express.Router();

// importamos el controlador
const proyectosController = require('../controllers/proyectosController');

// to export stuff in node, similar to export default ....
module.exports = function() {
  // ruta para el home
  router.get('/', proyectosController.proyectosHome);

  return router;
}