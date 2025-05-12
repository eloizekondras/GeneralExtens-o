// routes/siteRoutes.js

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/siteController');


// Rota para a página inicial do site
router.get('/',siteController.getAllDatas);

module.exports = router;