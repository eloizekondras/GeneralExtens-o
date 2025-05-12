const { DataTypes } = require("sequelize")
const db = require("../conn/connection")

const Usuario = db.define("Usuario",{
    nome:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    senha:{
        type: DataTypes.STRING,
        allowNull:false,
    },
});

module.exports = Usuario;