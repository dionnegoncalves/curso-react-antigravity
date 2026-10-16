import { useState } from "react";

function Login(aoLogar) {
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

        const dados = resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || "Erro no login");
            return;

        }

        aoLogar(dados.usuario); // chama a função que foi enviada via props, no caso, o componente App

    }

    return (
        <form onSubmit={enviar}>
            <h1>Login</h1>

            <input className="border-2 border-gray-400 rounded" type="email" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input className="border-2 border-gray-400 rounded" type="password" placeholder="Senha" value={senha} onChange={(event) => setSenha(event.target.value)} />
            <button className="inline-flex items-center justify-center gap-2 rounded-xl 
            bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all
            duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 focus:outline-none 
            focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer" type="submit">ENTRAR</button>


        </form>

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