const jwt = require("jsonwebtoken");

const createUserToken = async (usuario, req, res) => {
  const token = jwt.sign(
    // payload data
    {
      email: usuario.email,
      id: usuario.id,
    },
    "nossosecret"
  );

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userMail: usuario.email,
    userId: usuario.id,
  });
};

module.exports = createUserToken;
