const authController = {
    // Tela para cadastro do usuário
    register: (req,res)=>{
        return res.render("register",{
            title: "Cadastro"
        });
    },
    // Processamento do cadastro do usuário
    create: (req,res)=>{

    },
    // Tela para realizar login
    login: (req,res)=>{
        return res.render("login",{
            title: "Login"
        });
    },
    // Processamento do login
    auth: (req,res)=>{

    },
    // Processamento de deslogar
    logout: (req,res)=>{

    },
    // Outros métodos interessantes:
    // forgot: (req,res)=>{},
    // remember: (req,res)=>{},
    // reset: (req,res)=>{},
    // checkLogin: (req,res)=>{},
};

module.exports = authController;