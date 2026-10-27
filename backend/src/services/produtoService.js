import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";


async function listarProdutos() {

    return prisma.produto.findMany({
        orderBy: {
            id: "asc", // o "asc" significa ordem crescente e o "desc" significa ordem decrescente. 
        },
    });
}


async function criarProduto(dados) {

    return prisma.produto.create({
        data: dados,
    });

}


async function atualizarProduto(id, dados) {

    const existente =
        await prisma.produto.findUnique({
            where: {
                id,
            },
        });

    if (!existente) {

        throw new AppError(
            "Produto não encontrado.",
            404
        );

    }

    return prisma.produto.update({

        where: {
            id,
        },

        data: dados,

    });

}


async function excluirProduto(id) {

    const existente =
        await prisma.produto.findUnique({
            where: {
                id,
            },
        });

    if (!existente) {

        throw new AppError(
            "Produto não encontrado.",
            404
        );

    }

    return prisma.produto.delete({
        where: {
            id,
        },
    });

}


export {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
};