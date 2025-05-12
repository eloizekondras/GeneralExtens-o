// routes/contatoRoutes.js

const express = require('express');
const router = express.Router();
const contatoController = require('../controllers/contatoController');

// Rota para enviar e-mail de contato
router.post('/contato/enviar', contatoController.sendEmail);

module.exports = router;
