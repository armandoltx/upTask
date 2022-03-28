// importing express similar to import express from 'express'
const express = require('express');
const router = express.Router();

// to export stuff in node, similar to export default ....
module.exports = function() {
  // ruta para el home
  router.get('/', (req, res) => {
    res.send('Index');
  });

  return router;
}