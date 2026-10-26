import { describe, it, expect } from "vitest";
import { validarProduto } from "./produtoValidator.js";

// criação de casos de teste -> é o mesmo que dizer que os testes abaixo pertencem a função "validarProduto"
describe("validarProduto", () => {

    // função teste -> o nome que está aqui será o nome do arquivo de saída dos testes -> pode-se usar teste(), ao invés de it()
    it("deve retornar erro para nome inválido", () => {
        // Arrange -> organização dos dados de entrada -> preparação dos dados
        const produto = {
            nome: "",
            preco: 2.50,
            estoque: 10,
            categoria: "Pães"
        };

        // //Act -> execução do q será testado -> função validarProduto
        // const resultado = validarProduto(produto);

        //Assert -> verificação do resultado -> deve ser igual ao produto original
        expect(() => {
            validarProduto(produto);
        }).toThrow("O nome deve ter pelo menos 3 caracteres"); // o que o toThrow()? R: é uma função do vitest que verifica se a função que está sendo 
        // testada lança um erro e se lança ele verifica se a mensagem de erro é igual a mensagem que está sendo passada como parametro.  E se for igual? R: ele retorna 
        // true e o teste passa.  Mas se não for igual? R: ele retorna false e o teste falha, mostrando a seguinte mensagem de erro: "O nome deve ter pelo menos 3 caracteres".
    })

    it("deve rejeitar preço igual a zero", () => {
        const produto = {
            nome: "Pão Francês", // cria-se parâmetros que sabem que retornaram erro onde deseja-se testar.
            preco: 0,
            estoque: 10,
            categoria: "Pães"
        };

        expect(() => {
            validarProduto(produto);
        }).toThrow("O preço deve ser maior que 0"); // o que o toThrow()? R: é uma função do vitest que verifica se a função que está sendo 
        // testada lança um erro e se lança ele verifica se a mensagem de erro é igual a mensagem que está sendo passada como parametro.
    })

    it("deve rejeitar preço negativo", () => {
        const produto = {
            nome: "Pão Francês",
            preco: -140,
            estoque: 10,
            categoria: "Pães"
        };

        expect(() => {
            validarProduto(produto);
        }).toThrow("O preço deve ser maior que 0");
    })

    it("deve rejeitar estoque negativo", () => {
        const produto = {
            nome: "Pão Francês",
            preco: 2.50,
            estoque: -10,
            categoria: "Pães"
        };

        expect(() => {
            validarProduto(produto);
        }).toThrow("O estoque deve ser um número inteiro igual ou maior que 0");
    })

    it("deve rejeitar estoque não inteiro", () => {
        const produto = {
            nome: "Pão Francês",
            preco: 2.50,
            estoque: 10.5,
            categoria: "Pães"
        };

        expect(() => {
            validarProduto(produto);
        }).toThrow("O estoque deve ser um número inteiro igual ou maior que 0");
    })

    it("deve rejeitar categoria vazia", () => {
        const produto = {
            nome: "Pão Francês",
            preco: 2.50,
            estoque: 10,
            categoria: ""
        };

        expect(() => {
            validarProduto(produto);
        }).toThrow("A categoria é obrigatória");
    })

    it("deve rejeitar nome com mais de 11 caracteres", () => {
        const produto = {
            nome: "Refrigerante",
            preco: 5.00,
            estoque: 10,
            categoria: "Bebidas"
        };

        expect(() => {
            validarProduto(produto);
        }).toThrow("O nome do produto deve ter menos de 11 caracteres");
    });

    it("deve validar produto válido", () => {
        const produto = {
            nome: "Pão doce",
            preco: 2.50,
            estoque: 10,
            categoria: "Pães"
        };

        expect(validarProduto(produto)).toEqual(produto);
    })
})

