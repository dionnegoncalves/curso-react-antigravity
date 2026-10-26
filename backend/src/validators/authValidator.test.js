import { describe, it, expect } from "vitest";
import { validarCadastro } from "./authValidator";

describe("validarCadastro", () => {

    it("deve aceitar cadastro válido", () => {
        const dados = {
            nome: "João Silva",
            email: "JOAO@EMAIL.COM",
            senha: "12345678",
        };

        const resultado = validarCadastro(dados);

        expect(resultado).toEqual({
            nome: "João Silva",
            email: "joao@email.com", // "[EMAIL_ADDRESS]" 
            senha: "12345678",
        });

        // expect(resultado.nome).toBe("João Silva");
        // expect(resultado.email).toBe("[EMAIL_ADDRESS]");
        // expect(resultado.senha).toBe("[PASSWORD]");
    });

    it("deve rejeitar nome menor que 3 caracter", () => {
        const dados = {
            nome: "Jo",
            email: "joao@email.com",
            senha: "12345678",
        }

        expect(() => { // porque usar () => ? R: porque preciso passar uma função como parâmetro para o expect
            validarCadastro(dados);
        }).toThrow("O nome deve ter pelo menos 3 caracteres"); // porque usar .toThrow() ? R: porque preciso verificar se a função lança um erro
    })
})