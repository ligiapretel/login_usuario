const express = require("express");
const app = express();
const port = 3000;
const metthodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(metthodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: "senha" }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

app.listen(port, ()=>{
    console.log(`Estamos rodando em: http://localhost:${port}`);
})