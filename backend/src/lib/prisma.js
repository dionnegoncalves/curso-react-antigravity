import "dotenv/config";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "../../generated/prisma/client.ts";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

export { prisma }; // aqui está exportando a variável? sim. porque está entre chaves? respostas: 
// porque está exportando a variável, não a função.  