// models/Contato.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Contato = sequelize.define('Contato', {
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Contato;
