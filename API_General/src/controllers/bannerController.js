// controllers/bannerController.js

const Banner = require('../models/Banner');
const { Op } = require('sequelize');


exports.createBanner =  async (req, res) => {
  try {
    const { titulo, descricao, link, ordem } = req.body;
    const imagem = req.file.filename; 

    const banner = await Banner.create({ titulo, descricao, link, imagem, ordem }); 
    res.status(201).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o banner' });
  }
};


// Método para listar todos os banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [['ordem', 'ASC']],
  });
    res.status(200).json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os banners' });
  }
};

// Método para buscar um banner por ID
exports.getBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const banner = await Banner.findByPk(id);
    if (!banner) {
      res.status(404).json({ error: 'Banner não encontrado' });
      return;
    }
    res.status(200).json(banner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o banner' });
  }
};

// Método para buscar banners por título
exports.searchBannersByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; 

    const banners = await Banner.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, 
        },
      },
    });

    res.status(200).json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar banners por título' });
  }
};

// Método para atualizar um banner por ID
exports.updateBanner = async (req, res) => {
    const { id } = req.params;
    try {
      const { titulo, descricao, link, ordem } = req.body;
      const imagem = req.file.filename;
  
      const [updated] = await Banner.update({ titulo, descricao, link, imagem, ordem }, {
        where: { id },
      });
      if (updated) {
        const updatedBanner = await Banner.findByPk(id);
        res.status(200).json(updatedBanner);
      } else {
        res.status(404).json({ error: 'Banner não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o banner' });
    }
  };

// Método para excluir um banner por ID
exports.deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Banner.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({message : 'Banner excluído com sucesso'});
    } else {
      res.status(404).json({ error: 'Banner não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o banner' });
  }
};

