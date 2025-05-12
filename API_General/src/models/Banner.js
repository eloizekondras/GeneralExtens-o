// models/Banner.js

const { DataTypes } = require('sequelize');
const sequelize = require('../conn/connection'); // Importe sua configuração do Sequelize

const Banner = sequelize.define('Banner', {
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ordem: {
    type: DataTypes.INTEGER(2),
    allowNull: false,
  },
});

module.exports = Banner;
