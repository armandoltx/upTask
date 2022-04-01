// Sequelize is a promise-based Node.js ORM
const Sequelize = require('sequelize');

// importamos configuracion de la conexion de la BD
const db = require('../config/db');

// imporatmos el modelo proyectos, pq estan relacionados.
const Proyectos = require('./Proyectos');

// definimos el modelo
// lo 1 q pasamos es el nombre de la tabla proyectos
// lo 2 pasamos las columnas
const Tareas = db.define('tareas', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  tarea:  Sequelize.STRING(100),
  estado: Sequelize.INTEGER(1)
});
// Para crear la llave foranea y relacionar hambas tablas
Tareas.belongsTo(Proyectos);

module.exports = Tareas;