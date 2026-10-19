import { useState } from "react";

function Cadastro({ aoVoltarLogin }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function cadastrar(event) {
        event.preventDefault();
        setErro("");
        setMensagem("");

        if (senha !== confirmarSenha) {
            setErro("As senhas não são iguais");
            return;
        }

        try {
            const resposta = await fetch("http://localhost:3001/auth/cadastro",
                {
                    method: "POST",
                    credentials: "include",

                    headers: { "ContentType": "application/json" },

                    body: JSON.stringify({
                        nome,
                        email,
                        senha
                    })
                }
            )

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.erro || "Erro ao cadastrar usuário");
                return;
            }

            setMensagem("Usuário cadastradop com sucesso");

            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");

        } catch (erro) {
            console.error(erro);

            setErro("Não foi possível conectar ao servidoitr");
        }
    }


}

retur(
    <div>
        <h1>Criar Conta</h1>

        <form onSubmit={cadastrar}>

            <input type="text" placeholder="Nome" value={nome} onChange={(event) => setNome(event.target.value)} />

            <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />

            <input type="password" placeholder="Senha" value={senha} onChange={(event) => setSenha(event.target.value)} />

            <input type="password" placeholder="Confirmar Senha" value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)} />

            <button type="submit">Cadastrar</button>

        </form>

        {erro && (<p>{erro}</p>)}
        {mensagem && (<p>{mensagem}</p>)}

        <button type="button" onCLick="{aoVoltarLogin}"></button>

    </div>
)

export default Cadastro;

