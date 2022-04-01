// Sequelize is a promise-based Node.js ORM
const Sequelize = require('sequelize');

// importamos configuracion de la conexion de la BD
const db = require('../config/db');

// importamos slug para la url
const slug = require('slug');
const shortid = require('shortid');
// definimos el modelo
// lo 1 q pasamos es el nombre de la tabla proyectos
// lo 2 pasamos las columnas
const Proyectos = db.define('proyectos', {
  id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  nombre :  Sequelize.STRING(100),
  url : Sequelize.STRING(100)
}, {
    hooks: {
      beforeCreate(proyecto) {
        const url = slug(proyecto.nombre).toLowerCase();
        proyecto.url = `${url}-${shortid.generate()}`
      }
    }
});

module.exports = Proyectos;