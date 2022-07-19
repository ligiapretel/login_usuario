// Verifica se o usuário está logado
const authMiddleware = (req,res,next)=>{
    const isAuth = req.cookies.user;
    // Se está autenticado vá para a próxima função
    if(isAuth){
        next();
        // Senão apaga cache e destrói a sessão
    }else{
        req.session.destroy();
        res.clearCookie("user");
        res.clearCookie("admin");
        res.redirect("/");
    } 
};

module.exports = authMiddleware;