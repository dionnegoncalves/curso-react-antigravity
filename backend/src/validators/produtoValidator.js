import AppError from "../utils/AppError.js";

function validarProduto(dados) {
    const nome = String(dados.nome ?? "").trim(); // isso garante que se o valor for nulo ele se torne string vazia
    // e a função trim() garante que ele não tenha espaços vazios no inicio e no fim, o ?? significa "ou" e o "" significa string vazia
    // então se o valor for nulo ou indefinido ele se tornará uma string vazia e a função trim() removerá os espaços vazios
    // em qualquer caso, garantindo que a variável nome seja sempre uma string, mesmo que vazia
    // ?? é nulish coalescing operator Use dados.nomes, mas se for nulo ou undef. use ""

    /* if (nome.length < 2) {
        throw new AppError("O nome deve ter pelo menos 3 caracteres", 400);
    }

    if (dados.preco == null || isNaN(Number(dados.preco))) {
        throw new AppError("O preço deve ser um número válido", 400);
    }

    const preco = Number(dados.preco);

    if (preco < 0) {
        throw new AppError("O preço não pode ser negativo", 400);
    }

    const quantidade = Number(dados.quantidade ?? 0);

    if (isNaN(quantidade) || quantidade < 0) {
        throw new AppError("A quantidade deve ser um número válido e não negativo", 400);
    } */

    const preco = Number(dados.preco);
    console.log("Estou no validador e o preço é: " + dados.preco);

    const estoque = Number(dados.estoque);

    const categoria = dados.categoria;
    if (nome.length < 3) {
        throw new AppError(
            "O nome deve ter pelo menos 3 caracteres",
            400);
    }

    if (nome.length > 11) {
        throw new AppError(
            "O nome do produto deve ter menos de 11 caracteres",
            400);
    }

    if (nome === "") {
        throw new AppError(
            "O nome do produto é obrigatório",
            400);
    }

    if (!Number.isFinite(preco) || preco <= 0) { // o que é Number.isFinite? R: verifica se numero é finito
        throw new AppError(
            "O preço deve ser maior que 0",
            400,
        );
    }

    if (!Number.isInteger(estoque) || estoque < 0) {
        throw new AppError(
            "O estoque deve ser um número inteiro igual ou maior que 0",
            400,
        );
    }

    if (categoria.trim() === "") {
        throw new AppError(
            "A categoria é obrigatória",
            400,
        );
    }

    return {
        nome,
        preco,
        estoque,
        categoria,
    }
}

export { validarProduto }; // porque aqui é só export? R: porque aqui eu so tenho uma função pra exportar. 
// se eu tivesse mais de uma função eu teria que exportar todas elas com export
// porque não usar export default validarProduto? resposta: obriga usar o msm nome quem receb