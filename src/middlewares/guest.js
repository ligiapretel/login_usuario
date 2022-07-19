// Verifica se o usuário não está logado
const guestMiddleware = (req,res,next)=>{
    const isAuth = req.cookies.user;
    // Se não está autenticado vá para a próxima função
    if(!isAuth){
        next();
        // Senão redireciona para a rota raiz, ou seja, bloqueando o acesso a alguma páginas/ rotas
    }else{
        res.redirect("/");
    } 
};

module.exports = guestMiddleware;