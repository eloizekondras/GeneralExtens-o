// bannerController.js
const api = require('../config/api');


// Método para buscar todos os banners
exports.getAllBanners = async (req, res) => {
  try {

    const token = req.session.token;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    };

    // Faz uma solicitação GET para a API que fornece os banners
    const response = await api.get(`/banners`, config);

    // Obtenha os dados JSON da resposta
    const banners = response.data;

    // Renderiza a página banner/index.handlebars e passa os banners como contexto
    res.render('banner/', { banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar banners' });
  }
};
