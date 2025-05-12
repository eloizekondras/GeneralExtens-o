// controllers/eventoController.js

const Evento = require('../models/Evento');
const sequelize = require('sequelize');
const { Op } = sequelize;


// Método para criar um novo evento
exports.createEvento = async (req, res) => {
  try {
    const { titulo, resumo, conteudo, data_evento, local, hora_evento } = req.body;

      let imagens_internas = '';
    
      if (req.files['imagens_internas']){
        imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
      }

    const evento = await Evento.create({
      titulo,
      resumo,
      conteudo,
      imagens_internas: JSON.stringify(imagens_internas),
      data_evento,
      local,
      hora_evento,
    });
    res.status(201).json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o evento' });
  }
};

// Método para listar todos os eventos
exports.getAllEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      attributes: [
        'id',
        'titulo',
        'resumo',
        'conteudo',
        'imagens_internas',
        [sequelize.literal('DATE_FORMAT(data_evento, "%Y-%m-%d")'), 'data_evento'],
        //ou [sequelize.literal('DATE(data_evento)'), 'data_evento'],
        'local',
        'hora_evento',
        'createdAt',
        'updatedAt'
          
      ]});
    res.status(200).json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os eventos' });
  }
};

// Método para buscar um evento por ID
exports.getEventoById = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findByPk(id,{
      attributes: [
        'id',
        'titulo',
        'resumo',
        'conteudo',
        'imagens_internas',
        [sequelize.literal('DATE_FORMAT(data_evento, "%Y-%m-%d")'), 'data_evento'],
        //ou [sequelize.literal('DATE(data_evento)'), 'data_evento'],
        'local',
        'hora_evento',
        'createdAt',
        'updatedAt'
      ]
    });
    if (!evento) {
      res.status(404).json({ error: 'Evento não encontrado' });
      return;
    }
    res.status(200).json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o evento' });
  }
};

// Método para buscar eventos por título
exports.searchEventosByTitle = async (req, res) => {
  try {
    const { titulo } = req.query; // Recupera o título da consulta da query

    // Realiza a busca no banco de dados com base no título
    const eventos = await Evento.findAll({
      attributes: [
        'id',
        'titulo',
        'resumo',
        'conteudo',
        'imagens_internas',
        [sequelize.literal('DATE_FORMAT(data_evento, "%Y-%m-%d")'), 'data_evento'],
        //ou [sequelize.literal('DATE(data_evento)'), 'data_evento'],
        'local',
        'hora_evento',
        'createdAt',
        'updatedAt'
      ],
      where: {
        titulo: {
          [Op.like]: `%${titulo}%`, // Pesquisa por títulos que contenham o termo
        },
      },

    });

    res.status(200).json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar eventos por título' });
  }
};

// Método para atualizar um evento por ID
exports.updateEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const { titulo, resumo, conteudo, data_evento, local, hora_evento } = req.body;
    let imagens_internas = '';
    
    if (req.files['imagens_internas']){
      imagens_internas = req.files['imagens_internas'].map((file) => file.filename);
    }

    const [updated] = await Evento.update({
      titulo,
      resumo,
      conteudo,
      imagens_internas: JSON.stringify(imagens_internas),
      data_evento,
      local,
      hora_evento,
    }, {
      where: { id },
    });
    if (updated) {
      const updatedEvento = await Evento.findByPk(id);
      res.status(200).json(updatedEvento);
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o evento' });
  }
};

// Método para excluir um evento por ID
exports.deleteEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Evento.destroy({
      where: { id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o evento' });
  }
};
