const crypto = require("crypto");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // usado para permitir q portas distintas (5173 - React e 3001 - Backend) se comuniquem
app.use(express.json()); //Express interpreta JSON enviado ao servidor pelo React na requisição (req.body)

const PORT = 3001;

let produtos = [
    {
        id: "1",
        nome: "Pão de queijo",
        preco: 8.5,
        estoque: 20,
        categoria: "Bolos",
    },

    {
        id: "2",
        nome: "Bolo de chocolate",
        preco: 18,
        estoque: 5,
        categoria: "Salgados",
    },
];

let pdts = [
    {
        id: "1",
        nome: "Arroz",
        preco: 8.5,
        estoque: 20,
        categoria: "Bolos",
    },

    {
        id: "2",
        nome: "Feijão",
        preco: 18,
        estoque: 5,
        categoria: "Salgados",
    },
];

// definição de rotas
app.get("/", function (req, res) {
    res.send("API funcionando");
});

app.get("/pdts", function (req, res) {
    res.json(pdts);
});

// passando lista de produtos, qdo usuário solicitar /produtos na URL 
app.get("/produtos", function (req, res) {
    res.json(produtos);
});

app.get("/produtos", function (req, res) {
    res.json(pdts);
});

app.get("/dionne", (req, res) => {
    res.send("Dionne é perfeito");
});

app.get("/arcos/mg/crossfit", (requisicao, resposta) => {
    resposta.send("Você entrou na página de /arcos/mg/crossfit");
});

// qdo usuário enviar um produto para o backend, ele será cadastrado 
app.post("/produtos", function (req, res) {
    const novoProduto = {
        id: crypto.randomUUID(),
        nome: req.body.nome, // backend recebe dados via req.body da URL
        preco: req.body.preco,
        estoque: req.body.estoque,
        categoria: req.body.categoria,
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto); //retorna produto criado para o React -> 201 é se for criado com sucesso
});

app.put("/produtos/:id", (req, res) => {
    const id = req.params.id;

    const produto = produtos.find((pdt) => pdt.id === id);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }

    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.estoque = req.body.estoque;

    res.json(produto);
});

app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params; // extrai a prop id do obj q está chegando e coloca na var com msm nome
    // const id = req.params.id;

    produtos = produtos.filter((pdt) => pdt.id != id); // localiza o pdt com ID e não insere no novo array    

    res.status(204).send(); // fecha requisição sem retornar dados
});

app.listen(PORT, function () {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})


