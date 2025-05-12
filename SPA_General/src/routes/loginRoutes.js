// routes/loginRoutes.js

const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Rota para a página de login
router.get('/login/', loginController.getLogin);
router.post('/login/', loginController.autenticate);

// Rota para a página inicial do CMS
router.get('/admin/', function (req, res) {
    res.render('home')
  });

//Rota para logout do sistema
router.get('/logout', function (req, res) {
    //apaga a sessão
    req.session.destroy()
    //redireciona para a página de login
    res.redirect('/login')
  });


module.exports = router;
