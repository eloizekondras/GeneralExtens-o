//npm install express sequelize mysql2 multer nodemailer bcryptjs jsonwebtoken

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./src/conn/connection'); // Importe sua configuração do Sequelize
const bannerRoutes = require('./src/routes/bannerRoutes');
const noticiaRoutes = require('./src/routes/noticiaRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes');
const contatoRoutes = require('./src/routes/contatoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const cors = require('cors');


// Middleware para o corpo da solicitação JSON
app.use(bodyParser.json());

// Configurar o middleware bodyParser.urlencoded() para "form url encoded"
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do middleware express.static para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o middleware CORS
app.use(cors());

// Rota raiz
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de banners!');
});

// Use as rotas da API
app.use('/api', bannerRoutes);
app.use('/api', noticiaRoutes);
app.use('/api', eventoRoutes, contatoRoutes, usuarioRoutes);

// Porta de escuta
const PORT = process.env.PORT || 3000;

// Configurações do Sequelize
sequelize.sync({ force: false }) // Altere para true se quiser que as tabelas sejam recriadas
  .then(() => {
    console.log('Conectado ao banco de dados MySQL.');

    //comandos para criar usuário admin caso ele não exista(recomendado comentar as linhas após a criação)
    //importa a controller
    const usuarioController = require('./src/controllers/usuarioController');
    
    //chama a função para criar o usuario admin (email: admin@admin.com, senha: admin@)
    const created = usuarioController.createUsuarioAdmin();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });


