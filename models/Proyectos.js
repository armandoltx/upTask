const Sequelize = require('sequelize');

// importamos configuracion de la conexion de la BD
const db = require('../config/db');

// definimos el modelo
// lo 1 q pasamos es el nombre de la tabla proyectos
// lo 2 pasamos las columnas
const Proyectos = db.define('proyectos',{
  id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },

  nombre : Sequelize.STRING,
  url : Sequelize.STRING
});

module.exports = Proyectos;