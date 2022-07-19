const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");
const isAuth = require("../middlewares/auth");
const isGuest = require("../middlewares/guest");

// Para as rotas login e register, precisa passar pelo middlewaew isGuest - ou seja, se estiver logado, ele não acessa essa rota
router.get("/login",isGuest,authController.login);
router.post("/login",isGuest,authController.auth);

router.get("/register",isGuest,authController.register);
router.post("/register",isGuest,authController.create);

// Para a rota logout, precisa passar pelo middlewaew isAuth - ou seja, se não estiver logado, ele não acessa essa rota
router.post("/logout",isAuth,authController.logout);

module.exports = router;