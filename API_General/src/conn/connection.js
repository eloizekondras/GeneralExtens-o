const { Sequelize } = require('sequelize')

//Use os dados que você recebeu no email
const sequelize = new Sequelize('general', 'root', '2003', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});


  module.exports = sequelize