// routes/UsuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const checkToken = require('../helpers/check-token')

// Rota para criar um novo usuario com verificação de token
router.post('/usuarios',checkToken, usuarioController.createUsuario);

// Rota para listar todos os usuarios
router.get('/usuarios', usuarioController.getAllUsuarios);

// Rota para buscar um usuario por título
router.get('/usuarios/search', usuarioController.searchUsuariosByNome);

// Rota para buscar um usuario por ID
router.get('/usuarios/:id', usuarioController.getUsuarioById);

// Rota para atualizar um usuario com verificação de token
router.put('/usuarios/:id',checkToken, usuarioController.updateUsuario);

// Rota para excluir um usuario por ID com verificação de token
router.delete('/usuarios/:id',checkToken, usuarioController.deleteUsuario);

// Rota para logar no sistema
router.post('/login', usuarioController.loginPost);

// Rota para verificar se o token é válido
router.get('/checkUser', usuarioController.checkUser);


module.exports = router;
