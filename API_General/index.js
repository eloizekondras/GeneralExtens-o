const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./src/conn/connection');
const bannerRoutes = require('./src/routes/bannerRoutes');
const noticiaRoutes = require('./src/routes/noticiaRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const cors = require('cors');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Bem-vindo à API de banners!');
});

app.use('/api', bannerRoutes);
app.use('/api', noticiaRoutes);
app.use('/api', eventoRoutes, usuarioRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Conectado ao banco de dados MySQL.');

    const usuarioController = require('./src/controllers/usuarioController');
    
    const created = usuarioController.createUsuarioAdmin();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });


