// controllers/noticiaController.js

const Noticia = require('../models/Noticia');
const { Op } = require('sequelize');


// Método para criar uma nova notícia
exports.createNoticia = async (req, res) => {
  try {
    const { titulo, resumo, conteudo } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const noticia = await Noticia.create({ titulo, resumo, conteudo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) });
    res.status(201).json(noticia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a notícia' });
  }
};

// Método para listar todas as notícias
exports.getAllNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.findAll();
    res.status(200).json(noticias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar as notícias' });
  }
};

// Método para buscar uma notícia por ID
exports.getNoticiaById = async (req, res) => {
  const { id } = req.params;
  try {
    const noticia = await Noticia.findByPk(id);
    if (!noticia) {
      res.status(404).json({ error: 'Notícia não encontrada' });
      return;
    }
    res.status(200).json(noticia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar a notícia' });
  }
};

// Método para buscar noticias por título
exports.searchNoticiasByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const noticias = await Noticia.findAll({
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },
    });

    res.status(200).json(noticias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar noticias por título' });
  }
};

// Método para atualizar uma notícia por ID
exports.updateNoticia = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, resumo, conteudo } = req.body;
    const imagem_principal = req.files['imagem_principal'][0].filename;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const [updated] = await Noticia.update({ titulo, resumo, conteudo, imagem_principal, imagens_internas: JSON.stringify(imagens_internas) }, {
      where: { id },
    });
    if (updated) {
      const updatedNoticia = await Noticia.findByPk(id);
      res.status(200).json(updatedNoticia);
    } else {
      res.status(404).json({ error: 'Notícia não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a notícia' });
  }
};

// Método para excluir uma notícia por ID
exports.deleteNoticia = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Noticia.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Notícia excluída com sucesso' });
    } else {
      res.status(404).json({ error: 'Notícia não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a notícia' });
  }
};
