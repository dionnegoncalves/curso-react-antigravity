function errorHandler(erro, req, res, next) {
    //console.error(erro);

    const statusCode = erro.statusCode || 500; // esta linha verifica se a constante statusCode é diferente de zero, caso contrário, retorna 500. Se for diferente de 0, ela fica com o valor dela.

    const mensagem = statusCode === 500
        ? "Erro interno do servidor"
        : erro.message;

    const msg = res.status(statusCode).json({
        erro: mensagem,
        /*sucesso: false,
        statusCode,
        mensagem,*/
    });
    console.log(mensagem);
}
export default errorHandler;