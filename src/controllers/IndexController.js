const indexController = {
    home: (req,res)=>{
        return res.render("index", {
             title: "Home",
             user: req.cookies.user, // Passando o cookie do user e admin para a view - deve ser colocado em todas as renderizações de view
             admin: req.cookies.admin,
            });
    }
};

module.exports = indexController;