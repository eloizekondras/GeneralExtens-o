// routes/eventoRoutes.js

const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de eventos
router.get('/eventos/',checkSession, eventoController.getAllEventos);
router.get('/eventosCreate/',checkSession, eventoController.createEvento);
router.post('/eventosSearch/',checkSession, eventoController.searchEventosByTitle);
router.get('/eventos/:id',checkSession, eventoController.editEvento);


// Outras rotas da sua aplicação
// ...

module.exports = router;
