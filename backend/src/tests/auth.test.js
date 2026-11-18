import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";

const { authServiceMock } = vi.hoisted(() => {
    return {
        authServiceMock: {
            cadastrarUsuario: vi.fn(),
            autenticarUsuario: vi.fn(),
        }
    };
});

vi.mock("../services/authServices.js",
    () => authServiceMock
);

import app from "../app.js";
import test from "node:test";

// jwt.sign(
//     { usuarioId: usuario.id },
//     process.env.JWT_SECRET,
//     { expiresIn: "1h" }
// );


beforeEach(() => vi.clearAllMocks());

describe("Autenticação", () => {
    it("deve realizar login com dados válidos", async () => {
        const usuarioFalso = {
            id: 1,
            nome: "João",
            email: "joao@gmail.com",
        };

        authServiceMock.autenticarUsuario.mockResolvedValue(usuarioFalso);

        const resposta = await request(app).post("/auth/login").send({
            email: "joao@gmail.com",
            senha: "12345678",
        });

        expect(resposta.status).toBe(200);

        expect(resposta.body).toEqual({
            message: "Login realizado com sucesso",
            usuario: usuarioFalso,
        });

        expect(authServiceMock.autenticarUsuario).toHaveBeenCalledWith({
            email: "joao@gmail.com",
            senha: "12345678",
        });

        console.log(resposta.headers);

        expect(resposta.headers["set-cookie"]).toBeDefined(); // testa se o servidor enviou algum set-cookie

        expect(resposta.headers["set-cookie"][0]).toContain("token=");

        expect(resposta.headers["set-cookie"][0]).toContain("HttpOnly");

        expect(resposta.headers["set-cookie"][0]).toContain("SameSite=Lax");

    });
});