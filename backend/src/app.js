import "dotenv/config";

import express from "express";
import cors from "cors";

import produtoRoutes from "./routes/produtoRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();

app.use(cors({
    origin:
        process.env.FRONTEND_URL || "http://localhost:5173",
    // credentials:true, // necessário quando usamos cookies autenticação
}));

app.use(express.json()); // esta linha esta convertendo o json que chega do frontend em objeto javascript, esse json vem de onde? respostas: ele vem do frontend ao enviar os dados.
// mas o express não é um import? respostas: sim. é uma biblioteca. E como que vem dado do front se é uma biblioteca? respostas: o express não vem do front, ele recebe o json que vem do front, pois ele esta configurado para receber o json.
// onde esta esta configuração? respostas: esta no arquivo app.js na linha 18. esta linha esta convertendo o json que chega do frontend em objeto javascript.
// quando ela esta sendo chamada? respostas: ela esta sendo chamada toda vez que o frontend envia uma requisição para o backend.
// o que acontece se essa linha não estiver aqui? respostas: o backend não vai conseguir converter o json que vem do frontend em objeto javascript.
// por que eu preciso converter o json que vem do frontend em objeto javascript? respostas: porque o backend trabalha com objetos javascript, e o frontend envia json.
// o que é json? respostas: json é um formato de texto que é usado para transferir dados entre o frontend e o backend. ele é composto por pares de chave-valor, onde a chave é uma string e o valor pode ser uma string, número, booleano, array ou objeto.
// onde mais vejo json? respostas: vejo json em arquivos de configuração, em APIs, em bancos de dados.
// qual a diferença entre json e objeto javascript? respostas: json é um formato de texto, enquanto objeto javascript é um objeto que é criado em tempo de execução. o json é uma representação de dados, enquanto o objeto javascript é uma estrutura de dados.
// o que significa o .use? respostas: é uma função do express que é usada para adicionar um middleware ao pipeline de requisições. o middleware é uma função que é chamada toda vez que uma requisição é enviada para o servidor.
// quais são os middlewares do meu backend? respostas: os middlewares são cors, express.json, errorHandler e notFound.

// onde estão ficando salvos o objeto javascript que o app.use converte de json para js? respostas: nas constantes req.body, req.query, req.params
// qual a diferença entre elas? respostas: req.body é usado para enviar dados do frontend para o backend. req.query é usado para enviar dados do frontend para o backend. req.params é usado para enviar dados do frontend para o backend.

app.get("/", function (req, res) {
    res.json({
        mensagem: "API funcionando",
    });
}); // porque tem esse get aqui? respostas: não deveria estar aqui, mas para testar o cors

app.use(
    "/produtos", produtoRoutes // esta falando que nao esta encontrando esta rota
); // como isso funciona? respostas: o "/produtos" é o caminho que será adicionado a todas as rotas que estão no arquivo produtoRoutes.js, como o código sabe que é para adicionar, se não concatena, nem passa como parametro? respostas: o arquivo produtoRoutes.js é um objeto que exporta as rotas, e o app.use está recebendo esse objeto como parâmetro, e o "/produtos" é o caminho que será adicionado a todas as rotas que estão no arquivo produtoRoutes.js. por que o app.use recebe o objeto, se ele é uma função que recebe uma função como parametro? respostas: o app.use é uma função que recebe uma função como parametro, mas ele também recebe outros parametros, como o caminho que será adicionado a todas as rotas que estão no arquivo produtoRoutes.js, e o objeto que exporta as rotas.

// me explique o fluxo correto para que esse caminho /produtos seja adicionado Às rotas, de forma simples?
// quando o frontend envia uma requisição para o backend, por exemplo GET /api/v1/produtos/1, o que acontece?
// respostas: o express recebe a requisição, verifica se tem algum middleware que vai tratar essa requisição, se tiver,
// ele chama o middleware. se não tiver, ele verifica se tem alguma rota que vai tratar essa requisição, se tiver, ele chama a rota.
// se não tiver, ele chama o errorHandler.


app.use(notFound); // por que essa função está sendo chamada toda hora? respostas: porque ela está sendo chamada toda vez que o 
// frontend envia uma requisição para o backend.

app.use(errorHandler);

export default app;

// então toda vez que chega uma requisição, o código faz todos os .use, por exemplo o cors, express.json? respostas: sim.
// mas o cors não é um import? respostas: sim. é uma biblioteca. E como que vem dado do front se é uma biblioteca? respostas: o cors não vem do front, ele recebe o json que vem do front, pois ele esta configurado para receber o json. o que o cors faz? respostas: ele permite que o front acesse o backend.
// o que o express.json faz? respostas: ele converte o json que chega do front em objeto javascript.
// o que o errorHandler faz? respostas: ele trata os erros que chegam do backend.
// o que o notFound faz? respostas: ele trata os erros que chegam do backend.

// o que acontece se essa linha não estiver aqui? respostas: o backend não vai conseguir converter o json que vem do frontend em objeto javascript.
// quais são os middlewares? respostas: cors, express.json, errorHandler e notFound.






/*
app.use("/api/v1/produtos", produtoRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;*/