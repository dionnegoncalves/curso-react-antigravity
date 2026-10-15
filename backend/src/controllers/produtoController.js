import * as produtoServices from "../services/produtoService.js";
import { validarProduto } from "../validators/produtoValidator.js";
import { validarId } from "../validators/idValidator.js";

async function listarProdutos(req, res) {
    const produtos = await produtoServices.listarProdutos();
    res.json(produtos);
}

async function criarProduto(req, res) {
    // chama o validador de produto, passa o body da req
    const dados = validarProduto(req.body); // recebe e direciona a regra de negócio

    // se passou chama o criarProduto 
    const produto = await produtoServices.criarProduto(dados); // recebe e direciona a regra de negócio

    // retorno com status 2101: create 
    res.status(201).json(produto);
}

async function atualizarProduto(req, res) {
    // verifica se o id solicitado para atualizar esta dentro dos parâmetros corretos
    const id = validarId(req.params.id);

    // se o ID esta dentros os parâmetros, faz validação dos dados que serão atualizados, se seguem as diretrizes
    const dados = validarProduto(req.body);

    // se passou, atualiza o produto passando ID e os dados
    const produto = await produtoServices.atualizarProduto(id, dados);
    // retorna os dados atualizados
    res.json(produto);
}

async function excluirProduto(req, res) {
    // verifica se o id solicitado para atualizar esta dentro dos parâmetros corretos
    const id = validarId(req.params.id);

    // se sim, chama o excluir produto
    await produtoServices.excluirProduto(id); // ou await ... sem produto

    // retorna produto com código 204 que é o código universal para "sucesso"
    res.status(204).json();
}

export {
    listarProdutos,
    criarProduto,
    atualizarProduto,
    excluirProduto,
};