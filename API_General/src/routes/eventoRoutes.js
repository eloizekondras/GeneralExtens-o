// routes/eventoRoutes.js

const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const checkToken = require('../helpers/check-token')

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/eventos'));
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + path.extname(file.originalname));
    cb(null, crypto.randomBytes(24).toString('hex') + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Rota para criar um novo evento com upload de arquivo
router.post('/eventos',checkToken, upload.fields([
  { name: 'imagens_internas', maxCount: 10 },
]), eventoController.createEvento);

// Rota para listar todos os eventos
router.get('/eventos', eventoController.getAllEventos);

// Rota para buscar um evento por Titulo
router.get('/eventos/search', eventoController.searchEventosByTitle);

// Rota para buscar um evento por ID
router.get('/eventos/:id', eventoController.getEventoById);

// Rota para atualizar um evento com upload de arquivo
router.put('/eventos/:id',checkToken, upload.fields([
  { name: 'imagens_internas', maxCount: 10 },
]), eventoController.updateEvento);

// Rota para excluir um evento por ID
router.delete('/eventos/:id',checkToken, eventoController.deleteEvento);

module.exports = router;
