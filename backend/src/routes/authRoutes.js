import express from "express";

import { cadastrar, login, logout } from "../controllers/authController.js";

import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post("/cadastro", asyncHandler(cadastrar)); // se o usuario acessar o /cadastra vai rodar a função cadastrar e por estar dentro do asyncHandler ele é "envelopado", 
// ou seja, a função vai ser executada e se der erro, o asyncHandler vai tratar o erron e se não der erro ele retorna 201 e a resposta e o Status code, o que acontece 
// com qualquer função que estiver dentro do asyncHandler. A função não precisaria estar dentro do asyncHandler, já que as funções cadastrar, login e logout, 
// todas elas tem TryCatch? Resposta: sim, porem, mesmo tendo trycatch, o asyncHandler ainda é necessario, pois ele 
// trata o erro de forma mais genérica, enquanto o trycatch so trata o erro dentro da função.alem disso, o asyncHandler permite que 
// o codigo seja mais limpo e legivel, alem de evitar a repetição de codigo. o asyncHandler ele padroniza o retorno em caso de erro, enviando 
// sempre uma resposta em json com a mensagem de erro e o status code.   
router.post("/login", asyncHandler(login)); // se o usuario acessar o /login vai rodar a função login e vai passar pelo asyncHandler
router.post("/logout", asyncHandler(logout)); // se o usuario acessar o /logout vai rodar a função logout e vai passar pelo asyncHandler

export default router;

