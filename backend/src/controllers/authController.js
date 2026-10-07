import jwt from "jsonwebtoken";
import * as authService from "../services/authServices.js";
import { validarCadastro, validarLogin } from "../validators/authValidator.js"; // por que aqui especificou as funções? respostas: 
// porque no arquivo authValidator.js exportou somente as funções, diferente do arquivo authServices.js, 
// que exportou tudo com o *. na verdade o authService exportou somente duas funções tambem. 
// então tanto o authServices.js quanto o authValidator.js exportou somente duas funções.
// porque na hora de importar do authService usuou-se * as funções estão ali? respostas: porque o authService exportou tudo com o *.

async function cadastrar(req, res) {
    const dados = await validarCadastro(req.body); // recebe e direciona a regra de negócio -> recebe objeto

    // se passou pelo validador, vai para o service
    const usuario = await authService.cadastrarUsuario(dados); // recebe e direciona a regra de negócio -> recebe objeto

    res.status(201).json(usuario); // retorna o usuário criado
}

async function login(req, res) {
    const dados = validarLogin(req.body);

    // se passar pelo validador
    const usuario = await authService.autenticarUsuario(dados); // recebe e direciona a regra de negócio -> recebe objeto

    const token = jwt.sign(
        {
            usuarioId: usuario.id,
        },
        process.env.JWT_SECRET, // de onde esta vindo esse process? respostas: dot.env. MAs nao estou importando ele aqui dentro. 
        // Respostas: Ele nao precisa ser importado. Ele vem diretamente do arquivo dot.env, pois foi declarado la. E sempre que um arquivo 
        // é declarado no arquivo dot.env, ele fica disponivel para uso em qualquer lugar do projeto.
        // qual o caminho do dot.env? respostas: ele fica na raiz do projeto.
        // por que usar isso? respostas: para segurança. Se alguém tiver acesso ao arquivo dot.env, não terá acesso ao JWT_SECRET.
        // O que é o JWT_SECRET? respostas: é uma string aleatória que será usada para assinar e verificar os tokens JWT.
        // Qual o tamanho do JWT_SECRET? respostas: ele deve ter pelo menos 32 caracteres.
        // O que é um token JWT? respostas: é um token que será usado para autenticar os usuários.
        {
            expiresIn: "1h",
        }
    );

}




const jwtSecret = process.env.JWT_SECRET;

