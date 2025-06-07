const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('general', 'root', '2003', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});


  module.exports = sequelize