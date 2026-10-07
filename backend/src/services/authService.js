import bcrypt from "bcryptjs"; // para fazer hash da senha  
import { prisma } from "../lib/prisma.js"; // para acessar e manipular o ba   nco de dados
import AppError from "../utils/AppError.js"; // para tratar os erros

async function cadastrarUsuario({ // recebendo um obj como parâmetro e desestruturando ele 
    nome, // desestruturação de objeto
    email, // desestruturação de objeto
    senha, // desestruturação de objeto
}) {
    const usuarioExistente = await prisma.usuario.findUnique({ // procura no BD por email igual ao que foi enviado
        where: { email },
    });

    if (usuarioExistente) { // se encontrou um usuário com o email igual, lança erro
        throw new AppError("Usuário já existente", 409);
    }

    const senhaHash = await bcrypt.hash(senha, 12); // 12 é o custo de hash

    /*
    // gerar hash da senha
    const salt = await bcrypt.genSalt(10); // número de "rodas" que o algoritmo irá rodar para gerar o hash
    const hash = await bcrypt.hash(senha, salt); // gera o hash da senha
    */

    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senhaHash,
        },
        // não seleciona senhaHash -> enviando somente os necessários pro frontend
        select: { // seleciona os campos que serão retornados. Retornados para quem? respostas: para o controller. E o que o controller  
            // vai fazer? respostas:  vai retornar pro frontend. PAra que? respostas: Para que o frontend possa retornar para o usuário.
            // Mas o que o frontend retorna para o usuário? respostas: apenas os campos que o usuário precisa ver.
            // Quais campos o usuário precisa ver? respostas: id, nome, email e data de criação.
            // Mas por que não retornar a senhaHash? respostas: Porque a senhaHash é a senha criptografada e não deve ser compartilhada.
            id: true,
            nome: true,
            email: true,
            criadoEm: true,
        },
    })

    return usuario;
}

async function autenticarUsuario({
    email,
    senha,
}) {
    const usuario = await prisma.usuario.findUnique({
        where: { email, }
    });

    if (!usuario) {
        throw new AppError("Usuário ou senha inválidos", 401);
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaCorreta) {
        throw new AppError("Usuário ou senha inválidos", 401);
    }

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
    };
}

export {
    cadastrarUsuario,
    autenticarUsuario,
}

