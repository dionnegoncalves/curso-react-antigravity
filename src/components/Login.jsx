import { useState } from "react";

function Login({ aoLogar, aoCadastrar }) { // props tem que ter chaves
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function enviar(event) {
        event.preventDefault();

        const resposta = await fetch("http://localhost:3001/auth/login",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ email, senha }),
            }
        );

        const dados = await resposta.json(); // tem que usar await aqui? sim! se nao, recebe a promise. MAs já tem await no fetch? sim! Então por usar dois await?
        //  respostas: porque um é do fetch e o outro é do json. Como vou saber quando devo usar await? Resposta: Sempre que a função retornar uma promise. 
        // E como vou saber qual função retorna promise? Resposta: Pela documentação ou pelo tipo de retorno da função. E qual o tipo de retorno? 
        // Resposta: Vai retornar uma promise. O que é uma promise? Resposta: É um objeto que representa a conclusão ou falha de uma operação assíncrona. 
        // E o que é uma operação assíncrona? Resposta: É uma operação que não bloqueia a execução do código.
        // E como vou saber qual operação é assíncrona? Resposta: Pela documentação ou pelo tipo de retorno da função. E porque transformar dados em json com a função json() é assicrono?
        // Resposta: Porque o método json() é uma função assíncrona, ou seja, ele não bloqueia a execução do código.



        if (!resposta.ok) {
            alert(dados.erro || "Erro no login");
            return;

        }

        alert("Login realizado com sucesso");

        aoLogar(dados.usuario); // chama a função que foi enviada via props, no caso, o componente App -> setUsuario

    }

    return (
        <div>
            <form onSubmit={enviar}>
                <h1>Login</h1>

                <input className="border-2 border-gray-400 rounded" type="email" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
                <input className="border-2 border-gray-400 rounded" type="password" placeholder="Senha" value={senha} onChange={(event) => setSenha(event.target.value)} />
                <button className="inline-flex items-center justify-center gap-2 rounded-xl 
            bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all
            duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 focus:outline-none 
            focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer" type="submit">ENTRAR</button>
            </form>

            <p>Ainda não possui uma conta?</p>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl 
            bg-gradient-to-r from-blue-600 to-white-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all
            duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 focus:outline-none 
            focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
                type="button" onClick={aoCadastrar}>Criar Conta</button>

        </div>

        /* <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <!-- campo da senha -->
        <div>
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" value={senha} onChange={(event) => setSenha(event.target.value)} />
        </div>
        <button type="submit">Entrar</button> */
    );
}

export default Login;





/*  
    
    const [senha, setSenha] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const dadosLogin = {
            email: email,
            senha: senha,
        };

        const resposta = await fetch("http://localhost:3001/login",
            {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosLogin),
            }
        );

        if (resposta.ok) {
            aoLogar();
        } else {
            alert("Email ou senha inválidos");
        }
    }
}*/


/*
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        
    }
}*/