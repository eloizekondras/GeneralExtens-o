const api = require('../config/api');

// Método para mostrar a página de login
exports.getLogin = async (req, res) => {
  try {
    res.render('login/', { layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao renderizar página de login' });
  }
};

// Método para autenticar o usuário
exports.autenticate = async (req, res) => {
  const usuario = req.body;

  try {
    const response = await api.post(`/login/`, usuario);

    req.session.token = response.data.token;
    req.session.userId = response.data.userId;
    req.session.userMail = response.data.userMail;

    req.session.save(() => {
      return res.status(200).json({
        message: "Você está autenticado!",
        token: req.session.token,
        userMail: response.data.userMail,
        userId: response.data.userId,
      });
    });
  } catch (error) {
    if (error.response) {
      const mensagem = error.response.data.error || 'Erro ao fazer login';
      return res.status(401).json({ error: mensagem });
    } else if (error.request) {
      return res.status(503).json({ error: 'Erro de rede ou serviço indisponível' });
    } else {
      return res.status(500).json({ error: 'Erro ao processar a solicitação de login' });
    }
  }
};
