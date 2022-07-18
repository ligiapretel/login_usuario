const fs = require("fs");
const path = require("path");

const authController = {
    // Tela para cadastro do usuário
    register: (req,res)=>{
        return res.render("register",{
            title: "Cadastro"
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
                    messaga: "Senhas não coincidem",
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