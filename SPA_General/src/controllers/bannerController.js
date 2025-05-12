// bannerController.js
const api = require('../config/api');


// Método para buscar todos os banners
exports.getAllBanners = async (req, res) => {
  try {

    // Configurar o cabeçalho com a autorização do token
    /*OBSERVAÇÃO: A nossa API não exige token nas operações de consulta,
    deste modo a configuração do cabeçalho abaixo é opcional. 
    Eu coloquei esta configuração para que se um dia vocês precisarem enviar o token para a API o código é este.
    Inicialmente busca o token da sessão e envia no cabeçalho da requisição. 
    */
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
