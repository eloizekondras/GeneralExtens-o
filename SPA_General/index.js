const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bannerRoutes = require('./src/routes/bannerRoutes');
const noticiaRoutes = require('./src/routes/noticiaRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const loginRoutes = require('./src/routes/loginRoutes');
const siteRoutes = require('./src/routes/siteRoutes');
const bodyParser = require('body-parser');

const app = express();


// Definindo uma função para que o handlebars possa formatar a data corretamente para o usuário final
const hbs = exphbs.create({
  helpers: {
    formatDate: function (dateTimeString) {
      
      const date = new Date(dateTimeString); //Converte a string em data

      // Defina o fuso horário para UTC
      date.setUTCHours(0, 0, 0, 0);

      const year = date.getUTCFullYear(); // Pega o ano em UTC
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Pega o mês em UTC (+1 porque inicia do zero)
      const day = String(date.getUTCDate()).padStart(2, '0'); // Pega o dia em UTC

      return `${day}/${month}/${year}` //devolve formatado
    },
    formatDay: function (dateTimeString) {
      
      const date = new Date(dateTimeString); //Converte a string em data

      // Defina o fuso horário para UTC
      date.setUTCHours(0, 0, 0, 0);

      //const year = date.getUTCFullYear(); // Pega o ano em UTC
      //const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Pega o mês em UTC (+1 porque inicia do zero)
      const day = String(date.getUTCDate()).padStart(2, '0'); // Pega o dia em UTC

      return `${day}` //devolve formatado
    },
    formatMonth: function (dateTimeString) {
      
      const date = new Date(dateTimeString); //Converte a string em data

      // Defina o fuso horário para UTC
      date.setUTCHours(0, 0, 0, 0);

      //const year = date.getUTCFullYear(); // Pega o ano em UTC
      var month = date.getUTCMonth(); // Pega o mês em UTC (TIRAR o +1 porque inicia do zero)
      month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][month];

      //const day = String(date.getUTCDate()).padStart(2, '0'); // Pega o dia em UTC

      return `${month}` //devolve o mês formatado
    },
  }
});

// Configuração do Handlebars como engine de renderização
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configuração do diretório das views
app.set('views', path.join(__dirname, 'src','views'));

// Configurar o middleware bodyParser.urlencoded() para "form url encoded"
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));


/* CONFIGURAÇÕES DA SESSÃO DO USUÁRIO */
// Importa o módulo 'express-session'.
const session = require('express-session');

// Importa o módulo 'FileStore' que será usado para armazenar as sessões em arquivos no sistema de arquivos do servidor.
const FileStore = require('session-file-store')(session);

// Configuração do middleware 'express-session'.
app.use(
  session({
    // Define o nome do cookie de sessão.
    name: 'session',

    // Define uma chave secreta para assinar o cookie de sessão (mantenha isso em segredo).
    secret: 'nosso_secret',

    // Impede que a sessão seja regravada no servidor a cada solicitação.
    resave: false,

    // Impede que sessões não inicializadas sejam salvas no servidor.
    saveUninitialized: false,

    // Configura o local onde as sessões serão armazenadas no sistema de arquivos do servidor.
    store: new FileStore({
      // Uma função de log vazia que define o caminho para o diretório onde as sessões serão armazenadas.
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),

    // Configurações do cookie de sessão.
    cookie: {
      // Define se o cookie deve ser seguro (true em produção / geralmente para https).
      secure: false,

      // Define o tempo de vida máximo do cookie em milissegundos (1 hora neste exemplo).
      maxAge: 3600000,

      // Define a data de expiração do cookie (1 hora a partir do momento atual).
      expires: new Date(Date.now() + 3600000),

      // Impede que o cookie de sessão seja acessado por JavaScript no navegador (para segurança).
      httpOnly: true,
    },
  })
)

/* FIM DAS CONFIGURAÇÕES DA SESSÃO DO USUÁRIO */

// Configuração das rotas
// Adicione outras rotas conforme necessário

app.use('/', bannerRoutes); 
app.use('/', noticiaRoutes); 
app.use('/', eventoRoutes); 
app.use('/', usuarioRoutes); 
app.use('/', loginRoutes); 
app.use('/', siteRoutes); 

// Inicializa o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});