// Middleware que verifica a sessão do usuário
module.exports.checkSession = function (req, res, next) {
    
    // Obtém as informações da sessão do objeto 'req' (requisição)
    const userId = req.session.userId; 
    const token = req.session.token; 
    const userMail = req.session.userMail; 

    // Verifica se alguma das informações da sessão está ausente ou indefinida
    if (!userId || !token || !userMail) {
        // Se alguma das informações da sessão estiver ausente, redireciona o usuário para a página de login
        res.redirect('../login');
    }

    // Se todas as informações da sessão estiverem presentes, chama a próxima função no pipeline de middleware
    next();
};
