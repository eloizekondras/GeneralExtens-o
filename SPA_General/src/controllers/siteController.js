// siteController.js
const api = require('../config/api');

// Método para buscar todos os sites
exports.getAllDatas = async (req, res) => {
  try {
    // Faz uma solicitação GET para a API que fornece os banners
    let response = await api.get(`/banners`);
    const banners = response.data;

    // Adiciona o atributo active com o primeiro elemento com valor true
    let cont = 0;
    banners.forEach(function (element) {
      if (cont == 0) {
        element.active = true;
        cont++;
      } else {
        element.active = false;
      }
    });

  

    // Faz uma solicitação GET para a API que fornece os eventos
    response = await api.get(`/eventos`);
    const eventos = response.data;

    // Faz uma solicitação GET para a API que fornece as notícias
    response = await api.get(`/noticias`);
    const noticias = response.data;

    // Renderiza a página site/index.handlebars e passa os dados como contexto
    res.render('site/', { banners, eventos, noticias, layout: false }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar sites' });
  }
};
