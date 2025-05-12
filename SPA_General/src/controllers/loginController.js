// loginController.js
const api = require('../config/api');

// Método para mostrar a página de login
exports.getLogin = async (req, res) => {
  try {
    // Renderiza a página
    res.render('login/', { layout: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao renderizar página de login' });
  }
};

// Função para autenticar o usuário
exports.autenticate = async (req, res) => {
  try {
    // Obtém os dados do usuário a partir do corpo da requisição
    const usuario = req.body;

    // Faz uma solicitação POST para fazer o login do usuário usando a API 
    api.post(`/login/`, usuario)
      .then(response => {
        // Armazena informações importantes da sessão do usuário no objeto 'req.session'
        req.session.token = response.data.token; // Armazena o token de autenticação
        req.session.userId = response.data.userId; // Armazena o ID do usuário
        req.session.userMail = response.data.userMail; // Armazena o email do usuário

        // Salva a sessão antes de responder à requisição
        req.session.save(() => {
          // Retorna uma resposta bem-sucedida com informações de autenticação
          res.status(200).json({
            message: "Você está autenticado!",
            token: req.session.token,
            userMail: response.data.userMail,
            userId: response.data.userId,
          });
        });
      })
      .catch(error => {
        // Lida com erros de autenticação da API externa
        if (error.response) {
          // Caso a resposta da API contenha erro
          const mensagem = error.response.data.error || 'Erro ao fazer login';
          res.status(401).json({ error: mensagem });
        } else if (error.request) {
          // Caso não haja resposta da API
          res.status(503).json({ error: 'Erro de rede ou serviço indisponível' });
        } else {
          // Erros internos ou de configuração
          res.status(500).json({ error: 'Erro ao processar a solicitação de login' });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
