import AppError from "../utils/AppError.js";

function validarCadastro(dados) {
    const nome = String(dados.nome ?? "").trim();
    const email = String(dados.email ?? "").trim().toLowerCase();
    const senha = String(dados.senha ?? "").trim();
    // const senhaHash = String(dados.senhaHash ?? "").trim();
    // const criadoEm = String(dados.criadoEm ?? "").trim();  

    if (nome.length < 3) {
        throw new AppError("O nome deve ter pelo menos 3 caracteres", 400);
    }

    if (!email.includes("@") || !email.includes(".")) {
        throw new AppError("E-mail inválido", 400);
    }

    if (senha.length < 8) {
        throw new AppError("A senha deve ter ao menos 8 caracteres", 400);
    }

    return { // retornando um objeto validado para quem chama-la 
        nome,
        email,
        senha,
    }
}

function validarLogin(dados) {
    const email = String(dados.email ?? "").trim().toLowerCase();
    const senha = String(dados.senha ?? "").trim();

    if (!email || !senha) {
        throw new AppError("E-mail e senha são obrigatórios", 400);
    }

    if (!email.includes("@") || !email.includes(".")) {
        throw new AppError("E-mail inválido", 400);
    }

    if (senha.length < 8) {
        throw new AppError("A senha deve ter ao menos 8 caracteres", 400);
    }

    return {
        email,
        senha,
    }
}

export { validarCadastro, validarLogin };

// modules.export = função é o método antigo (node older) de exportar (comun) 


