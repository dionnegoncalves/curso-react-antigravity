class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message); // o que esta linha faz? R: chama o message da classe pai Error

        this.statusCode = statusCode;
    }
}

export default AppError;