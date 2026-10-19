import { useState, useEffect } from 'react'

import Header from "./components/Header"
import FormularioProduto from './components/FormularioProduto';
import ListaProdutos from './components/ListaProdutos';
import Login from './components/Login';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null); // null significa "nenhum produto em edição"

  useEffect(() => {
    verificarSessao();
  }, []);

  // useEffect é para fazer requisições quando o componente montar (for criado, ser modificado ou destruido) // o uso do [] fala para o useEffect para executar 
  // somente uma vez, quando o componente for montado
  useEffect(() => {
    carregadorProdutos();
  }, []); //usa-se o [] para informar que a função deve ser executado somente uma vez, quando o componente for montado (na raiz) // se colocar uma variável
  // dentro do array, o useEffect será executado toda vez que a variável for alterada

  async function verificarSessao() {
    try {
      const resposta = await fetch("http://localhost:3001/auth/me",
        {
          credentials: "include",
        }
      ); // await para aguardar carregar os produtos

      if (!resposta.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const dados = await resposta.json(); // aguarda resposta em json -> transformar em obj JS
      setUsuario(dados.usuario);

    } catch (erro) {
      setUsuario(null);
    }
  }

  // buscando produto do BD e jogando no componente
  async function carregadorProdutos() { // o async é só pra funções assincronas, ele é como um "aviso" pra dizer que a função vai usar await
    try {
      const resposta = await fetch("http://localhost:3001/produtos",
        {
          credentials: "include",
        }
      ); // await para aguardar carregar os produtos

      if (!resposta.ok) {
        throw new Error("Erro ao buscar produtos");
      }

      const dados = await resposta.json(); // aguarda resposta em json -> transformar em obj JS
      setProdutos(dados);

    } catch (erro) {
      console.error(erro)
    }
  }

  async function adicionarProduto(event) {
    event.preventDefault(); // previne que a pág autocarregue

    if (nome.trim() === "" || Number(preco) <= 0 || Number(estoque) < 0 || categoria === "") { // trim remove espaços em branco no início e no final
      alert("Preencha os valores corretamente");
      return;
    } // previne erro quando o usuário não preenche os campos -> observando a variavel do useState

    const dadosProduto = {
      nome: nome,
      preco: Number(preco),
      estoque: Number(estoque),
      categoria: categoria,
    };

    console.log(`o dado da categoria é 2 ${categoria}`); // imprimindo atoa

    try {
      if (produtoEmEdicao) {
        const resposta = await fetch(`http://localhost:3001/produtos/${produtoEmEdicao.id}`,
          {
            credentials: "include",
            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosProduto),
          });

        if (!resposta.ok) {
          throw new Error("Erro ao atualizar produto");
        }
      } else {
        const resposta = await fetch("http://localhost:3001/produtos",
          {
            credentials: "include",
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dadosProduto),
          }
        );
        console.log("Entrei aqui");

        if (!resposta.ok) {
          throw new Error(
            "Erro ao cadastrar produto"
          )
        }
      }
      limparFormulario();
      await carregadorProdutos();

    } catch (error) {
      console.error(error);
    }
  }

  function editarProduto(produto) { // recebe o obj correspondente onde o botão está
    setProdutoEmEdicao(produto); // atualiza o variavel do useState produtoEmEdicao
    setNome(produto.nome); // atualiza os campos que estão observ. o useState
    setPreco(produto.preco); // atualiza os campos que estão observ. o useState
    setEstoque(produto.estoque); // atualiza os campos que estão observ. o useState -> preenche a tela
    setCategoria(produto.categoria);
  }

  async function excluirProduto(id) {
    try {
      console.log(`Entrei no try com o id ${id}`);
      const resposta = await fetch(`http://localhost:3001/produtos/${id}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao excluir produto");
      }

      await carregadorProdutos();

    } catch (erro) {
      console.error(erro);
    }
  }

  function cancelarEdicao() {
    limparFormulario();
  }

  function limparFormulario() {
    setProdutoEmEdicao(null);
    setNome("");
    setPreco("");
    setEstoque("");
    setCategoria("");
  }

  if (!usuario) {
    console.log("entrei no usuario null");
    return (
      <Login aoLogar={setUsuario} />
    )
  }

  async function logout() {
    await fetch("http://localhost:3001/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    setUsuario(null);
  }

  return (
    <main>
      <Header />

      <FormularioProduto // enviando props
        nome={nome}
        preco={preco}
        estoque={estoque}
        categoria={categoria}
        setNome={setNome}
        setPreco={setPreco}
        setEstoque={setEstoque}
        setCategoria={setCategoria}
        adicionarProduto={adicionarProduto}
        cancelaerEdicao={cancelarEdicao}
        produtoEmEdicao={produtoEmEdicao}
      />

      <ListaProdutos // enviando props
        produtos={produtos}
        excluirProduto={excluirProduto}
        editarProduto={editarProduto} //jogando função dentro de uma variável
      />

    </main>
  )
}

export default App;