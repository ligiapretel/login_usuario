const express = require("express");
const app = express();
const port = 3000;
const metthodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const indexRoute = require("./src/routes/indexRoute");
const authRoute = require("./src/routes/authRoute");

app.use(metthodOverride("_method"));
// Converte o corpo da requisição (body) em objeto literal
app.use(express.json());
// Converte requisição para formato que o json aceita 
app.use(express.urlencoded({ extended: false }));

//Só conseguimos usar os cookies se inicializarmos ele aqui
app.use(cookieParser());
// O secret tem a função de criptografar a session e precisamos dela para criptografar e descriptografar. Não deve ser enviada ao github. Pode ser qualquer string
app.use(session({ secret: "senha" }));

//  Configura pasta estática para acesso externo
app.use(express.static(path.join(__dirname, "public")));

// Configura o template engine, que por padrão é jade, para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é na raiz
app.set("views", path.join(__dirname, "src", "views"));

app.use("/", indexRoute);
app.use("/",authRoute);

// Inicia o servidor
app.listen(port, ()=>{
    console.log(`Estamos rodando em: http://localhost:${port}`);
})