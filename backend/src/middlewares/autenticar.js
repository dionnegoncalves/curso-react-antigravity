import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

function autenticar(req, res, next) {
    // receber token que esta no cookie
    const token = req.cookies.token; // como o javascript vai pegar o token, se o cookie esta no navegador?
    // resposta: por causa do cookie-parser, que esta configurado no app.js
    // qual é o caminho do cookie-parser? respostas: /src/middlewares/autenticar.js
    // o que ele faz? respostas: ele pega o cookie e coloca no req.cookies
    // por que ele faz isso? respostas: porque ele foi configurado para fazer isso no app.js
    // por que o cookie-parser é necessario? respostas: porque ele é um middleware que é usado para analisar cookies que são enviados pelo frontend
    // mas o httponly está bloqueando a captura de cookies pelo javascript? respostas: não, o cookie-parser está capturando o cookie e colocando no req.cookies
    // o que é httponly? respostas: é um atributo do cookie que impede que o cookie seja acessado por scripts do lado do cliente, como o javascript
    // o que é sameSite? respostas: é um atributo do cookie que controla as restrições de envio de cookies entre diferentes domínios
    // o que é secure? respostas: é um atributo do cookie que permite apenas que cookies sejam enviados em conexões HTTPS
    // o que é maxAge? respostas: é um atributo do cookie que define o tempo de expiração do cookie
    // mas o front end não consegue ler o cookie? respostas: não, por causa do httponly
    // o que acontece se não tiver o cookie? respostas: vai dar erro
    // então porque o cookie esta sendo capturado aqui? respostas: porque o cookie esta sendo enviado pelo frontend e o cookie-parser esta capturando o cookie e colocando no req.cookies
    // pode ter uym invasor e caputar a requesição e pegar o req.cookies? respostas: não, por causa do httponly e do sameSite   

    if (!token) {
        throw new AppError("Usuyário não autenticado.", 401);
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // colocar usuarioId na requisicao
        req.usuarioId = payload.usuarioId; // o que é payload? respostas: é o objeto que foi assinado com o JWT_SECRET
        next(); // chama o proximo middleware e qual é o proximo middleware? respostas: o controller, mas ele não deveria chamar a próxima rota no produtoRoutes? 
        // respostas: não, ele deveria chamar a rota, mas ele não está chamando a rota. o que acontece se não tiver o next? respostas: vai dar erro
        // de que tipo de erro? respostas: erro de timeout
        // qual é o timeout? respostas: 5000
        // quanto tempo o backend vai esperar pela resposta do front? respostas: 5000ms
        // e se o front não responder? respostas: vai dar erro de timeout
        // o que acontece se o front responder? respostas: vai executar o controller e retornar a resposta

    } catch {
        throw new AppError(
            "Sessão inválida ou expirada",
            401
        );
    }

    /* catch (error) {
        // verificar se o token foi expirado
        if (error.name === "TokenExpiredError") {
            throw new AppError("Token expirado.", 401);
        }
        throw new AppError("Token inválido.", 401);
    }*/
}

export default autenticar;
