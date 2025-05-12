// usuarioController.js

const api = require('../config/api');

// Método para buscar todos os usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os usuarios
    const response = await api.get(`/usuarios`);

    // Obtenha os dados JSON da resposta
    const usuarios = response.data;

    // Renderiza a página usuario/index.handlebars e passa os usuarios como contexto
    res.render('usuario/', { usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuarios' });
  }
};

// Método para buscar usuario para edição
exports.editUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece o usuario
    const response = await api.get(`/usuarios/${id}`);

    // Obtenha os dados JSON da resposta
    const usuario = response.data;

    // Renderiza a página usuario/edit.handlebars e passa o usuario como contexto
    res.render('usuario/edit', { usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuario' });
  }
};

// Método para apresentar formulário de criação do usuario
exports.createUsuario = async (req, res) => {
  try {
    // Renderiza a página usuario/create.handlebars
    res.render('usuario/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de usuarios' });
  }
};


// Método para buscar todos os usuarios
exports.searchUsuariosByNome = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/usuarios/search?nome=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const usuarios = response.data;

    // Renderiza a página usuario/index.handlebars e passa os usuarios como contexto
    res.render('usuario/', { usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuarios' });
  }
};



