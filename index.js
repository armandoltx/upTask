// importing express similar to import express from 'express'
const express = require('express');

// crear una applicacion de express para el servidor
const app = express();

// ruta para el home es un middleware
app.use('/', (req, res) => {
  res.send('Hola');
});

// puerto en el q corre la app
app.listen(3000);