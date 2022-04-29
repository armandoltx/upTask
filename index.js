// importing express similar to import express from 'express'
const express = require('express');
// para importar las rutas
const routes = require('./routes');

// para leer os datos de un formulario necesitamos esta libreria
const bodyParser = require('body-parser');

//para leer las vistas y los archivos
const path = require('path');

const expressValidator = require('express-validator');

const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

// extraer valores de variables.env
require('dotenv').config({ path: 'variables.env' })

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

// habilitar bodyParser para leer los datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

// Agregamos express validator a toda la aplicación
// app.use(expressValidator());


// Ageregar la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Agregar flash messages
app.use(flash());

app.use(cookieParser());

// para manterner la sesion abierta entre todas las paginas cuando naveguemos por ellas.
app.use(session({
  secret: 'cualquiercosa',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// pasar vardump helper a la aplicacion
app.use((req, res, next) => {
  // console.log(req.user);
  res.locals.vardump = helpers.vardump; // usamos res.locals para usar el helper en cualquier parte de la app
  res.locals.mensajes = req.flash(); // pasando los mensajes de flash a cualquier parte de la app.
  res.locals.usuario = {...req.user} || null; // pasamos el usuario, una copia del usuario si existe
  next(); // para q pase al siguiente midleware
})

// ruta para el home es un middleware
// app.use('/', (req, res) => {
//   res.send('Hola');
// });
// como van a haber muchas rutas creamos su propia carpeta usando router de express
app.use('/', routes());

// puerto en el q corre la app y servidor
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log('El servidor esta funcionando');
})


// para los emails de recovery pass
require('./handlers/email');