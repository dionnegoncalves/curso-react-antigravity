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
})



