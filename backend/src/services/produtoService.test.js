import { describe, it, expect, vi, beforeEach } from "vitest"; // vi é uma ferramenta de mock do vitest para trabalhar com mocks, spies, funções falsas e stubs e o beforeEach é 
// uma ferramenta do vitest para executar um teste antes de cada teste.

const { prismaMock } = vi.hoisted(() => {
    return {
        prismaMock: {
            produto: { // produto é o que? R: o prisma.client.produto
                findMany: vi.fn(),
                create: vi.fn(),
                findUnique: vi.fn(),
                update: vi.fn(),
                delete: vi.fn()
            },
        }
    }
});

vi.mock("../lib/prisma.js", () => ({ // ({retorna obj sem usar return})
    prisma: prismaMock,
})
);

import { listarProdutos, criarProduto, atualizarProduto, excluirProduto } from "./produtoService.js";

beforeEach(() => {
    vi.clearAllMocks(); // isso vai limpar todos os mocks que foram criados.
});

describe("produtoService", () => {
    it("deve listar os produtos", async () => {
        const produtosFalsos = [
            {
                id: 1,
                nome: "Café",
                preco: 15,
                estoque: 10,
                categoria: "Pães",
            },
            {
                id: 2,
                nome: "Leite",
                preco: 8,
                estoque: 20,
                categoria: "Pães",
            },
        ];

        prismaMock.produto.findMany.mockResolvedValue(produtosFalsos);

        const resultado = await listarProdutos();

        console.log("RESULDADO: ", resultado);
        console.log("PDTS FALSOS: ", produtosFalsos);

        expect(resultado).toEqual(produtosFalsos);

        expect(prismaMock.produto.findMany).toHaveBeenCalledWith({
            orderBy: {
                id: "asc",
            },
        });
    })

    it("deve criar um produto", async () => {
        const dados = {
            nome: "Café",
            preco: 15,
            estoque: 10,
            categoria: "Pães",
        };

        const produtoCriado = {
            id: 1,
            ...dados, // spread deto das atributos do obdados, inserindo os valores de dados no objeto produtoCriado.o obj
        };

        prismaMock.produto.create.mockResolvedValue(produtoCriado); // qdo a função create mock é chamada, o mockeResolvedValue 
        // finge que a função create do prisma foi chamada e retornou o valor de produtoCriado. Promise resolvida.

        const resultado = await criarProduto(dados); // chamamos a função criarProduto passando os dados.

        expect(resultado).toEqual(produtoCriado);

        expect(prismaMock.produto.create).toHaveBeenCalledWith({
            data: dados,
        });

        expect(prismaMock.produto.create).toHaveBeenCalledTimes(1);

    })

    it("deve atualizar um produto existente", async () => {
        // mock de pdt existenhte
        const produtoExistente = {
            id: 1,
            nome: "Café",
            preco: 15,
            estoque: 10,
            categoria: "Pães",
        }

        // dados novo para atualizar o pdt 
        const novosDados = {
            nome: "Café Premium ",
            preco: 20,
            estoque: 8,
            categoria: "Pães",
        }

        // atualizando o pdt existente com novo pdt
        const produtoAtualizado = {
            id: 1,
            ...novosDados,
        };

        // simula a resolução da promise
        prismaMock.produto.findUnique.mockResolvedValue(produtoExistente);

        prismaMock.produto.update.mockResolvedValue(produtoAtualizado);

        const resultado = await atualizarProduto(1, novosDados);

        expect(resultado).toEqual(produtoAtualizado);

        expect(prismaMock.produto.findUnique).toHaveBeenCalledWith({
            where: {
                id: 1
            }
        })

        expect(prismaMock.produto.update).toHaveBeenCalledWith({
            where: {
                id: 1
            },

            data: novosDados,
        })

    });

    it("deve gerar erro ao atualizar produto inexistente", async () => {
        const produtoNaoEncontrado = null;

        prismaMock.produto.findUnique.mockResolvedValue(produtoNaoEncontrado);

        // Testar o valor retornado (sucesso)	const r = await fn(); expect(r).toEqual(...)
        // Testar que a função lança erro (rejeição)	await expect(fn()).rejects.toThrow(...)

        await expect(atualizarProduto(999, {
            nome: "Teste",
            preco: 10,
            estoque: 1,
            categoria: "Maça",
        })).rejects.toThrow("Produto não encontrado");

        // testar que o update nem foi chamado, pois deu erro no findUnique
        expect(prismaMock.produto.update).not.toHaveBeenCalled();

        // const resultado = await atualizarProduto(999, {
        //     nome: "Teste",
        //     preco: 10,
        //     estoque: 1,
        //     categoria: "Maça",
        // });

        // expect(resultado).rejects.toThrow("Produto não encontrado");

    })
})



