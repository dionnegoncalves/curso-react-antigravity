import AppError from "../utils/AppError.js";

function validarId(valor) {
    const id = Number(valor);

    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError("ID inválido", 400);
    }

    return id;
}

export { validarId };
