import express from "express";
import autenticar from "../middlewares/autenticar.js";


import {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto
} from "../controllers/produtoController.js";

import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();


// tudo abaixo daqui para baixo so vai ser executado se o usuario estiver autenticado
router.use(autenticar);
// se o usuario estiver autenticado, vai passar por essa rota aqui e ser direcionado para o controller. o que significa esse asyncHandler? respostas: 
// é uma função que trata os erros que chegam do backend, e qual é o controller? respostas: é a função que vai tratar a requisição. mQuial função trata a requisição? respostas: 
// asyncHandler trata os erros.
// por que o asyncHandler está sendo chamado aqui? respostas: porque ele está sendo chamado toda vez que o frontend envia uma requisição para o backend.
// o que acontece se o asyncHandler não estiver aqui? respostas: o backend não vai conseguir converter o json que vem do frontend em objeto javascript.
// onmde está localizado este controller? respostas: é que o controller está localizado no arquivo produtoController.js, e o arquivo produtoController.js está localizado 
// em backend/src/controllers
//qual é o controller? respostas: é a função que vai tratar a requisição.
//qual é a rota? respostas: é a rota que vai tratar a requisição.
//qual é o método? respostas: é o método que vai tratar a requisição.
//qual é a função? respostas: é a função que vai tratar a requisição.
//qual é o arquivo? respostas: é o arquivo que vai tratar a requisição.
//qual é o middleware? respostas: é o middleware que vai tratar a requisição.

router.get(
    "/",
    asyncHandler(listarProdutos)
);

router.post(
    "/",
    asyncHandler(criarProduto)
);

router.put(
    "/:id",
    asyncHandler(atualizarProduto)
);

router.delete(
    "/:id",
    asyncHandler(excluirProduto)
);

export default router;

// ao exportar router, os componentes de fora enxergam get, post, put e delete? respostas: sim. ao usar import { router } from "../routes/produtoRoutes.js";