// routes/noticiaRoutes.js

const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de noticias
router.get('/noticias/',checkSession, noticiaController.getAllNoticias);
router.get('/noticiasCreate/',checkSession, noticiaController.createNoticia);
router.post('/noticiasSearch/',checkSession, noticiaController.searchNoticiasByTitle);
router.get('/noticias/:id',checkSession, noticiaController.editNoticia);

module.exports = router;
