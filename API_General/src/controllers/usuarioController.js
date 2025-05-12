const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');


exports.createUsuario = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10); //Sequencia aleatória de dados usado para aumentar a segurança do hash
    const hashSenha = bcrypt.hashSync(req.body.senha, salt); // Cria o hash

    const usuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: hashSenha,
    };

    //validação para ver se usuario já está cadastrado
    const userExists = await Usuario.findOne({ where: { email: usuario.email } });

    if (userExists) {
      res.status(422).json({ error: `Já existe usuário cadastrado com o e-mail: ${usuario.email}` });
      return;
    }


    const usuarioCriado = await Usuario.create(usuario);
    res.status(201).json(usuarioCriado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
};

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: [
        'id',
        'nome',
        'email',
        'createdAt',
        'updatedAt'
      ],
      order: [['createdAt', 'DESC']], // ordenar resultados, novos registros primeiro
      limit: 1000,
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar os usuários' });
  }
};

exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }
    usuario.senha = undefined;

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o usuário' });
  }
};

// Método para buscar Usuarios por título
exports.searchUsuariosByNome = async (req, res) => {
  try {
    const { nome } = req.query; // Recupera o nome da consulta da query

    // Realiza a busca no banco de dados com base no nome
    const Usuarios = await Usuario.findAll({
      attributes: [
        'id',
        'nome',
        'email',
        'createdAt',
        'updatedAt'
      ],
      where: {
        nome: {
          [Op.like]: `%${nome}%`, // Pesquisa por nomes que contenham o termo
        },
      },
    });

    res.status(200).json(Usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar Usuarios por nome' });
  }
};

exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashSenha = bcrypt.hashSync(req.body.senha, salt); // Cria o hash

    const usuario = {
      nome: req.body.nome,
      email: req.body.email,
      senha: hashSenha,
    };

    //validação para ver se outro usuario já tem este email cadastrado
    const userExists = await Usuario.findOne({
      where: {
        email: usuario.email,
        id: { [Op.ne]: id }
      } // email igual ao informado e id diferente do usuario atual (Op.ne significa Not Equals {diferente})
    });

    if (userExists) {
      res.status(422).json({ error: `Já existe outro usuário cadastrado com o e-mail: ${usuario.email}` });
      return;
    }

    const [updated] = await Usuario.update(usuario, {
      where: { id },
    });

    if (updated) {
      const updatedUsuario = await Usuario.findByPk(id);
      updatedUsuario.senha = undefined;
      res.status(200).json(updatedUsuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o usuário' });
  }
};

exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Usuario.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o usuário' });
  }
};

//Método para fazer o login usuário
exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  try {
    // localiza o usuário
    const usuario = await Usuario.findOne({ where: { email: email } });
    if (!usuario) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }
    // compara a senha
    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta) {
      res.status(401).json({ error: 'Senha inválida' });
      return;
    }

    //res.status(200).json({ message: 'Login bem-sucedido' });
    await createUserToken(usuario, req, res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};


exports.checkUser = async (req, res) => {

  // Verifica se o cabeçalho 'authorization' está presente na solicitação HTTP.
  if (req.headers.authorization) {
    // Se o cabeçalho 'authorization' existe, chama a função 'getToken' para extrair o token JWT.
    const token = getToken(req)

    // Verifica se não foi possível extrair o token ou se o token está vazio.
    if (!token) res.status(401).json({ error: "Acesso negado. Token não enviado!" });

    try {
      // Tenta verificar e decodificar o token usando a chave secreta "nossosecret".
      const decoded = jwt.verify(token, "nossosecret");
      // Extrai o ID do usuário do token decodificado.
      const userId = decoded.id;

      // Procura um usuário no banco de dados com o ID extraído do token.
      const currentUser = await Usuario.findOne({ where: { id: userId } });

      if (!currentUser) res.status(401).json({ error: "Acesso negado. usuário do token é inválido!" });
      // Remove a senha do usuário antes de enviar a resposta.
      currentUser.senha = undefined

      // Retorna um status de resposta HTTP 200 (OK) e envia os dados do usuário (sem a senha).
      res.status(200).send(currentUser)

    } catch (error) {
      // Se ocorrer um erro durante a verificação ou decodificação do token, retorna um status de resposta HTTP 401 (Não Autorizado) com uma mensagem de erro.
      res.status(401).json({ error: "Acesso negado. Token inválido!" });
    }

  } else {
    // Se o cabeçalho 'authorization' não estiver presente na solicitação HTTP, retorna um status de resposta HTTP 401 (Não Autorizado) com uma mensagem de erro.
    res.status(401).json({ error: "Acesso negado. Token não enviado!" });
  }
}


//Função para criar usuário admin após a criação do banco de dados
exports.createUsuarioAdmin = async () => {
  try {
      // Verifica se o usuário admin já existe
      const admin = await Usuario.findOne({
          where: { email: 'admin@admin.com' },
      });

      // Se o usuário admin não existe, cria-o
      if (!admin) {

        senhaAdmin = 'admin@'
        const salt = bcrypt.genSaltSync(10);
        const hashSenha = bcrypt.hashSync(senhaAdmin, salt); // Cria o hash
          await Usuario.create({
              nome: 'Admin',
              email: 'admin@admin.com',
              senha: hashSenha, // Senha criptografada
          });
          console.log('Usuário admin criado com sucesso.');
          return true;
      } else {
          console.log('Usuário admin já existe.');
          return false;
      }
  } catch (error) {
      console.error('Erro ao criar o usuário admin:', error);
      return false;
  }
};
