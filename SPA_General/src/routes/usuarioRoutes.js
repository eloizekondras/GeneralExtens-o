// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// importa o método para verificar a sessão do usuário
const checkSession = require("../helpers/sessao").checkSession;

// Rota para a página de usuarios
router.get('/usuarios/',checkSession, usuarioController.getAllUsuarios);
router.get('/usuariosCreate/',checkSession, usuarioController.createUsuario);
router.post('/usuariosSearch/',checkSession, usuarioController.searchUsuariosByNome);
router.get('/usuarios/:id',checkSession, usuarioController.editUsuario);


// Outras rotas da sua aplicação
// ...

module.exports = router;
