const fs = require("fs");
const path = require("path");

const authController = {
    // Tela para cadastro do usuário
    register: (req,res)=>{
        return res.render("register",{
            title: "Cadastro",
            user: req.cookies.user,
            admin: req.cookies.admin,
        });
    },
    // Processamento do cadastro do usuário
    create: (req,res)=>{
        // Lendo o arquivo json
        const userJson = fs.readFileSync(
            // Caminho do arquivo
            path.join(__dirname,"..","data","users.json"),
            // Formato de leitura
            "utf-8"
        );
        // Convertendo o arquivo em objeto literal
        const users = JSON.parse(userJson);
        // console.log(users);
        const { nome, sobrenome, apelido, email,senha, confirmar_senha } = req.body;
        if(
            !nome ||
            !sobrenome ||
            !apelido ||
            !email ||
            !senha ||
            !confirmar_senha  
        ){
            return res.render("register",{
                title: " Cadastro",
                error: {
                    message: "Preencha todos os campos",
                }
            });
        };
        if(senha !== confirmar_senha){
            return res.render("register",{
                title: "Cadastro",
                error: {
                    message: "Senhas não coincidem",
                }
            });
        };

        // Atribuindo um id dinâmico ao usuário, de forma que ele pegue o último id e some mais 1
        const newId = users[users.length -1].id +1;  

        //Criar novo usuário que a gente recebeu
        const newUser = {
            id: newId,
            nome,
            sobrenome,
            apelido,
            senha,
            email,
            admin: false,
            //Adicionando datas de criação e modificação (que na criação serão iguais)
            criadoEm: new Date(),
            modificadoEm: new Date(),
        }
        //Adicionando o newUser no final do array
        users.push(newUser);
        //Atualizar o arquivo json
        fs.writeFileSync(
            path.join(__dirname,"..","data","users.json"),
            JSON.stringify(users)
        );
        res.redirect("/");
    },
    // Tela para realizar login
    login: (req,res)=>{
        // Teste para ver que a sessão armazena o email do useuárioi logado
        // console.log(req.session.email)

        return res.render("login",{
            title: "Login",
            user: req.cookies.user,
            admin: req.cookies.admin,
        });
    },
    // Processamento do login
    auth: (req,res)=>{
        //Limpando o cookie da sessão na autenticação
        res.clearCookie("user");
        res.clearCookie("admin");
        // Lendo o arquivo json
        const userJson = fs.readFileSync(
            // Caminho do arquivo
            path.join(__dirname,"..","data","users.json"),
            // Formato de leitura
            "utf-8"
        );
        // Convertendo o arquivo em objeto literal
        const users = JSON.parse(userJson);
        // Recebendo o name dos inputs via desestruturação via corpo da requisição
        const { email, senha } = req.body;
        //Buscar em users se existe esse email e se a senha corresponde a esse usuário
            const userAuth = users.find(user=>{
                if(user.email===email){
                    if(user.senha===senha){
                        // Se existir o usuário e se a senha corresponder a esse usuário, retorne true
                        return true;
                    }
                }
            });

            if(!userAuth){
                return res.render("login",{
                    title: "Login",
                    error: {
                        message: "Email ou senha inválidos",
                    }
                });
            };

            // Filtrando as chaves que o objeto irá ter - para não jogar dados sensíveis no navegador, já que é possível ver os cookies por lá
            const user = JSON.parse(
                JSON.stringify(userAuth, ["id","nome","sobrenome","apelido","admin"])
            );

            // Dando tudo certo com a autenticação, podemos criar uma sessão e redirecionamos o usuário
            req.session.email = userAuth.email; 
            // Criando um cookie da sessão
            res.cookie("user",user);
            res.cookie("admin",user.admin);

            res.redirect("/");
    },
    // Processamento de deslogar
    logout: (req,res)=>{
        // Destruindo a sessão
        req.session.destroy();
        // Limpando os cookies
        res.clearCookie("user");
        res.clearCookie("admin");
        res.redirect("/");
    },
    // Outros métodos interessantes:
    // forgot: (req,res)=>{},
    // remember: (req,res)=>{},
    // reset: (req,res)=>{},
    // checkLogin: (req,res)=>{},
};

module.exports = authController;