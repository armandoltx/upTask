// importing express similar to import express from 'express'
const express = require('express');
// para importar las rutas
const routes = require('./routes');

//para leer las vistas y los archivos
const path = require('path');

// crear una applicacion de express para el servidor
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));


// Habilitar Pug
app.set('view engine', 'pug');
// Ageregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// ruta para el home es un middleware
// app.use('/', (req, res) => {
//   res.send('Hola');
// });
// como van a haber muchas rutas creamos su propia carpeta usando router de express
app.use('/', routes());

// puerto en el q corre la app
app.listen(3000);