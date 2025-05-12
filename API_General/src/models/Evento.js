// models/Evento.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection');

const Evento = sequelize.define('Evento', {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  resumo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagens_internas: {
    type: DataTypes.TEXT, // Armazenar como JSON
    allowNull: true,
  },
  data_evento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  hora_evento: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

module.exports = Evento;
