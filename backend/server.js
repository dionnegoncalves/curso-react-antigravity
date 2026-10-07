import express from "express";
import cors from "cors";

import { prisma } from "./prismaClient.js"

const app = express();

app.use(cors()); // usado para permitir q portas distintas (5173 - React e 3001 - Backend) se comuniquem
app.use(express.json()); //Express interpreta JSON enviado ao servidor pelo React na requisição (req.body)

const PORT = 3001;

// definição de rotas
app.get("/", function (req, res) {
    res.send("API funcionando");
});

// passando lista de produtos, qdo usuário solicitar /produtos na URL 
app.get("/produtos", async function (req, res) {

    try {

        const produtos = await prisma.produto.findMany({ orderBy: { id: "asc" }, });
        res.json(produtos); // responde enviando os produtos em JSON

    } catch (erro) {

        console.log(erro);
        res.status(500).json({ erro: "Erro ao buscar produtos." });

    }
});

// qdo usuário enviar um produto para o backend, ele será cadastrado 
app.post("/produtos", async function (req, res) {

    try {
        const novoProduto = await prisma.produto.create({ // .create -> insere um produto no BD
            data: { // data: {} -> contém aquilo que será gravado no BD
                nome: req.body.nome, // backend recebe dados via req.body da URL
                preco: req.body.preco,
                estoque: req.body.estoque,
                categoria: req.body.categoria,
            },
        });

        res.status(201).json(novoProduto);

    } catch (erro) {

        console.log(erro);
        res.status(500).json({ erro: "Erro ao cadastrar produto." });

    }

});

app.put("/produtos/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const pdtExistente = await prisma.produto.findUnique({ // findUnique -> encontra exatamente 1 registro
            where: { id: id },
        });

        if (!pdtExistente) {
            return res.status(404).json({
                erro: "Produto não encontrado",
            });
        }

        const produtoAtualizado = await prisma.produto.update({ // update -> atualize 1 registro encontrado
            where: { id: id },
            data: {
                nome: req.body.nome,
                preco: req.body.preco,
                estoque: req.body.estoque,
                categoria: req.body.categoria,
            },
        });

        res.json(produtoAtualizado);

    } catch (error) {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao atualizar produto" });
    }

});

app.delete("/produtos/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const pdtExistente = await prisma.produto.findUnique({ // findUnique -> encontra exatamente 1 registro
            where: { id: id },
        });

        if (!pdtExistente) {
            return res.status(404).json({
                erro: "Produto não encontrado",
            });
        }

        await prisma.produto.delete({ // delete -> o BD exclui o registro de sua memória 
            where: { id: id },
        });

        res.status(204).send(); // uso do SEND e não do JSON


    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao excluir produto" });
    }
});

app.listen(PORT, function () {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})


