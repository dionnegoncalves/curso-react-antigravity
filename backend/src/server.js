import "dotenv/config";

import app from "./app.js";

const PORT = process.env.port || 3001;

app.listen(PORT, () => { //app é uma constante que recebe o retorno da função que está 
    // importada no arquivo app.js.
    //  e o que está importado no arquivo app.js é o app que é uma função que recebe 
    // uma função como parametro
    console.log(`Servidor rodando na porta: ${PORT}`);
});

// a função .listen ela inicia o servidor na porta especificada e recebe uma função como parametro, que será
// executada quando o servidor for iniciado.
// e como eu inicio o servidor? respostas: digitando no terminal npm start.
