// routes/bannerRoutes.js

const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const checkToken = require('../helpers/check-token')

const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configuração do multer para lidar com uploads de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/img/banners')); // Define a pasta de destino
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Gera um nome de arquivo único
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Rotas para banners
router.post('/banners',checkToken,upload.single('imagem'), bannerController.createBanner);
router.get('/banners', bannerController.getAllBanners);
router.get('/banners/search', bannerController.searchBannersByTitle);
router.get('/banners/:id', bannerController.getBannerById);
router.put('/banners/:id',checkToken, upload.single('imagem'), bannerController.updateBanner);
router.delete('/banners/:id',checkToken, bannerController.deleteBanner);


module.exports = router;
