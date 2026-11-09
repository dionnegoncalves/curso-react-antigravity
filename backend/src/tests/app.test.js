// importar vitest
import { describe, it, expect } from "vitest";
// importar supertest
import request from "supertest";
// importar app onde será testado
import app from "../app.js";

describe("API", () => {

    it("deve responder que a API está funcionando", async () => {
        const resposta = await request(app).get("/"); // como funciona o request do supertest? R: ele simula um servidor com base no app.js e faz a req GET "/""

        expect(resposta.status).toBe(200); // espera-0se que o servidor tenha respondido 200

        expect(resposta.body).toEqual({ // espera-se que o JSON retornado seja igual a este
            mensagem: "API funcionando",
        });

    });

    it("deve retornar 404 para uma rota inexistente", async () => {
        const resposta = await request(app).get("/rota-que-nao-existe");

        expect(resposta.status).toBe(404);

        expect(resposta.body.erro).toContain("Rota não encontrada");
    });

});