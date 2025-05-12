// eventoController.js

const api = require('../config/api');

// Método para buscar todos os eventos
exports.getAllEventos = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os eventos
    const response = await api.get(`/eventos`);

    // Obtenha os dados JSON da resposta
    const eventos = response.data;

    // Renderiza a página evento/index.handlebars e passa os eventos como contexto
    res.render('evento/', { eventos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
};

// Método para buscar evento para edição
exports.editEvento = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece o evento
    const response = await api.get(`/eventos/${id}`);

    // Obtenha os dados JSON da resposta
    const evento = response.data;

    // Renderiza a página evento/edit.handlebars e passa o evento como contexto
    res.render('evento/edit', { evento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar evento' });
  }
};

// Método para apresentar formulário de criação do evento
exports.createEvento = async (req, res) => {
  try {
    // Renderiza a página evento/create.handlebars
    res.render('evento/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de eventos' });
  }
};


// Método para buscar todos os eventos
exports.searchEventosByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/eventos/search?titulo=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const eventos = response.data;

    // Renderiza a página evento/index.handlebars e passa os eventos como contexto
    res.render('evento/', { eventos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
};

