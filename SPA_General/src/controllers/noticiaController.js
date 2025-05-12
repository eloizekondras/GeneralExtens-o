// noticiaController.js

const api = require('../config/api');

// Método para buscar todos os noticias
exports.getAllNoticias = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os noticias
    const response = await api.get(`/noticias`);

    // Obtenha os dados JSON da resposta
    const noticias = response.data;

    // Renderiza a página noticia/index.handlebars e passa os noticias como contexto
    res.render('noticia/', { noticias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar noticias' });
  }
};

// Método para buscar noticia para edição
exports.editNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    // Faz uma solicitação GET para a API que fornece o noticia
    const response = await api.get(`/noticias/${id}`);

    // Obtenha os dados JSON da resposta
    const noticia = response.data;

    // Renderiza a página noticia/edit.handlebars e passa o noticia como contexto
    res.render('noticia/edit', { noticia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar noticia' });
  }
};

// Método para apresentar formulário de criação do noticia
exports.createNoticia = async (req, res) => {
  try {
    // Renderiza a página noticia/create.handlebars
    res.render('noticia/create');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao mostrar formulário de criação de noticias' });
  }
};


// Método para buscar todos os noticias
exports.searchNoticiasByTitle = async (req, res) => {
  try {
    // Obter o valor inserido no campo de pesquisa
    const valorPesquisa = req.body.valorPesquisa

    // Fazer uma solicitação GET para buscar banners com base no título
    const response = await api.get(`/noticias/search?titulo=${valorPesquisa}`)

    // Obtenha os dados JSON da resposta
    const noticias = response.data;

    // Renderiza a página noticia/index.handlebars e passa os noticias como contexto
    res.render('noticia/', { noticias });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar noticias' });
  }
};

