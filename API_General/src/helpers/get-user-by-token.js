const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

// get user by jwt token
const getUserByToken = async (token) => {
  if (!token) return res.status(401).json({ error: "Acesso negado!" });

  // find user
  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const usuario = await Usuario.findOne({where: { id: userId }});

  return usuario;
};

module.exports = getUserByToken;
