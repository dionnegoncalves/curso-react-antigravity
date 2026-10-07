import AppError from "../utils/AppError";

function notFound(req, res, next) { // quando que entra nesta função no componente app.js? 
    res.send("Página não encontrada.");
    next(
        new AppError(
            `Rota não encontrada: ${req.method} ${req.originalUrl}`,
            404
        )
    );
}

export default notFound;

// se alguém acessar GET /banana receberá um tratamento de erro. Isso acontece porque o asyncHandlerWrap não vai conseguir encontrar a rota e vai chamar o next. O errorHandler vai capturar esse erro e retornar a resposta.
