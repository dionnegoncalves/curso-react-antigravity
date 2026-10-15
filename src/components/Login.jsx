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

            <input type="email" placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="Senha" value={senha} onChange={(event) => setSenha(event.target.value)} />
            <button type="submit">ENTRAR</button>


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