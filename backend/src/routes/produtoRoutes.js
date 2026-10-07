import express from "express";

import {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto
} from "../controllers/produtoController.js";

import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

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