// Sequelize is a promise-based Node.js ORM
const Sequelize = require('sequelize');

// importamos configuracion de la conexion de la BD
const db = require('../config/db');

const bcrypt = require('bcrypt-nodejs');

// imporatmos el modelo proyectos, pq estan relacionados.
// cada usuario puede crear proyectos
const Proyectos = require('./Proyectos');

// 1 paramatero nombre del modelo, 2 los atributos
const Usuarios = db.define('usuarios', {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Agrega un correo valido.'
      },
      notEmpty: {
        msg: 'El email no puede estar vacio'
      },
    },
    unique: {
      args: true,
      msg: 'Usuario ya registrado.'
    }
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El password no puede estar vacio'
      }
    }
  }
}, {
  hooks: {
    beforeCreate(usuario) {
      // console.log('creando nuevo usuario');
      // console.log(usuario);
      usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
    }
  }
});
// Para crear la llave foranea y relacionar hambas tablas
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;