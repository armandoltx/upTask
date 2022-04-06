// importing express similar to import express from 'express'
const express = require('express');
// para importar las rutas
const routes = require('./routes');

// para leer os datos de un formulario necesitamos esta libreria
const bodyParser = require('body-parser');

//para leer las vistas y los archivos
const path = require('path');

// importar los helpers para usar las funciones
const helpers = require('./helpers');

// Crear la conexion a la BD
const db = require('./config/db');

// Importar los modelos
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

//usa promesas asi q usamos promises
db.sync()
  .then(() => console.log('conectado al servidor'))
  .catch(error => console.log(error));
// crear una applicacion de express para el servidor
const app = express();

// Donde cargar los archivos estaticos
app.use(express.static('public'));


// Habilitar Pug
app.set('view engine', 'pug');
// Ageregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// pasar vardump helper a la aplicacion
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump; // usamos res.locals para usar el helper en cualquier parte de la app
  next(); // para q pase al siguiente midleware
})

// habilitar bodyParser para leer los datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// ruta para el home es un middleware
// app.use('/', (req, res) => {
//   res.send('Hola');
// });
// como van a haber muchas rutas creamos su propia carpeta usando router de express
app.use('/', routes());

// puerto en el q corre la app
app.listen(3000);