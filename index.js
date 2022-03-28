// importing express similar to import express from 'express'
const express = require('express');
// para importar las rutas
const routes = require('./routes');

// crear una applicacion de express para el servidor
const app = express();

// ruta para el home es un middleware
// app.use('/', (req, res) => {
//   res.send('Hola');
// });
// como van a haber muchas rutas creamos su propia carpeta usando router de express
app.use('/', routes());

// puerto en el q corre la app
app.listen(3000);