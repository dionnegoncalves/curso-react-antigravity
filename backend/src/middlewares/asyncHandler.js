function asyncHandler(funcao) {

    return function (req, res, next) { // o que fica dentro deste next qudo a função chega aqui? respostas:  
        // a próxima função do middleware ou a rota. E qual funçõa é esta que será a proxima? respostas: asyncHandler. 
        // E o next está dentro de quem? respostas: do erro handler

        console.log("Entrei no async");
        Promise
            .resolve( // resolve significa? é como se fosse um try. E se entrar no resolve, qual função é chamada? respostas: 
                // chama a função que foi passada como parâmetro. E essa função chama quem? respostas: o next. Quem é o next? 
                // a próxima função do middleware ou a rota. E essa função chama quem? respostas: o erro handler. Quem é o erro
                //  handler? 
                // o erro handler é uma função que é passada como parâmetro para o asyncHandler. E se der erro, chama o next?
                //  respostas: sim.
                // em qual momento a função da rota GET é chamada? respostas: quando o frontend envia uma requisição para o backend
                // e o express recebe a requisição, verifica se tem algum middleware que vai tratar essa requisição, se tiver,
                // ele chama o middleware. se não tiver, ele verifica se tem alguma rota que vai tratar essa requisição, se tiver, 
                // ele chama a rota.
                // o que é uma rota? respostas: uma rota é uma função que é chamada quando o frontend envia uma requisição 
                // para o backend
                funcao(req, res, next) // chama a função que foi passada como parâmetro

            )
            .catch(next); // se der erro, chama o next por causa do asyncHandler. E quem recebe este next? respostas: o erro handler
    }


}

export default asyncHandler;

// o que faz essa função? respostas: ela recebe uma função como parâmetro, envolve ela em um Promise e retorna o resultado.
// Se der erro, chama o next.
// porque usamos ela? respostas: para evitar repetir o try-catch em todos os controllers.
// por isso passamos asyncHandler para todas as rotas

// o que fazer para nao usar mtos try/catch nas funções
// o que fazer para nao usar mtos async/await nas funções

// caso eu venha pela rota GET /api/v1/produtos?categoria=eletrônicos, o que acontece?
// respostas: o express recebe a requisição, verifica se tem algum middleware que vai tratar essa requisição, se tiver,
// ele chama o middleware. se não tiver, ele verifica se tem alguma rota que vai tratar essa requisição, se tiver, ele chama a rota.
// se não tiver, ele chama o errorHandler.
// mas para isso acontecer, primeiro preciso que o app.use(asyncHandler(listarProdutos)) funcione, certo? respostas: sim.
