import jwt from "jsonwebtoken";
import * as authService from "../services/authServices.js";
import { validarCadastro, validarLogin } from "../validators/authValidator.js"; // por que aqui especificou as funções? respostas: 
// porque no arquivo authValidator.js exportou somente as funções, diferente do arquivo authServices.js, 
// que exportou tudo com o *. na verdade o authService exportou somente duas funções tambem. 
// então tanto o authServices.js quanto o authValidator.js exportou somente duas funções.
// porque na hora de importar do authService usuou-se * as funções estão ali? respostas: porque o authService exportou tudo com o *.
import { prisma } from "../lib/prisma.js";

async function me(req, res) {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: req.usuarioId
        },

        select: {
            id: true,
            nome: true,
            email: true,
        }
    });

    res.json({ usuario });
}

async function cadastrar(req, res) {
    const dados = validarCadastro(req.body); // recebe e direciona a regra de negócio -> recebe objeto

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

    res.cookie("token", token, // para impedir roubo de cookie, usamos secure: true, sameSite: "strict", httpOnly: true
        // assimo javascript nao pode fazer documento.cookie = contra ataque XSS       
        {
            httpOnly: true, // o que isso faz? respostas: impede que o token seja acessado por scripts do lado do cliente, como o javascript
            sameSite: "lax", // o que isso faz? respostas: controla as restrições de envio de cookies entre diferentes domínios
            secure: process.env.NODE_ENV === "production", // o que isso faz? respostas: permite apenas que cookies sejam enviados em 
            // conexões HTTPS, em produção
            maxAge: 60 * 60 * 1000, // 1 hora em milissegundos

            /*
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,*/

            /*Em ambiente local (localhost:5173 para localhost:3001) funciona bem. No entanto, caso você venha a hospedar o frontend e backend 
            em domínios/subdomínios cruzados diferentes (ex: Vercel e Render), cookies com sameSite: "lax" serão bloqueados pelo navegador em 
            requisições assíncronas do React. Nesses casos, o padrão exigido pela web é sameSite: "none" combinado com secure: true.*/
        }
    );

    res.status(200).json({
        message: "Login realizado com sucesso",
        usuario,
    });
}

function logout(req, res) {
    res.clearCookie(
        "token",
        {
            httpOnly: true, // impede captura de cookie pelo JS -> Ataque XSS (Cross-Site Scripting)
            sameSite: "lax", // controla as restrições de envio de cookies entre diferentes domínios, 
            // somente onde o usuário iniciua (clica, por exemplo)
            secure: process.env.NODE_ENV === "production", //permite apenas que cookies sejam enviados em 
            // conexões HTTPS, em produção. Em desenvolvimento não é necessário, pois não estamos usando HTTPS.
            // maxAge: 60 * 60 * 1000, -> Expira em 1 hora em milissegundos
        }
    );

    res.status(204).send();
}

export {
    cadastrar,
    login,
    logout,
    me,
};