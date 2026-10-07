import { useState, useEffect } from 'react'
import Header from "./components/Header"
import FormularioProduto from './components/FormularioProduto';
import ListaProdutos from './components/ListaProdutos';

function App() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null); // null significa "nenhum produto em edição"

  function adicionarProduto(event) {
    event.preventDefault(); // previne que a pág autocarregue

    if (nome.trim() === "" || Number(preco) <= 0 || Number(estoque) < 0 || categoria === "") { // trim remove espaços em branco no início e no final
      alert("Preencha os valores corretamente");
      return;
    } // previne erro quando o usuário não preenche os campos -> observando a variavel do useState

    if (produtoEmEdicao) { // se tem algo é pq não é null, logo entra no IF
      const produtosAtualizados = produtos.map(produto => { // coloca em produtosAtualizados um novo array com o resultado do map
        if (produto.id === produtoEmEdicao.id) {
          return {
            ...produto, // destrincha somente de 1 produto
            nome: nome,
            preco: Number(produto.preco),
            estoque: Number(produto.estoque),
            categoria: produto.categoria,
          }
        }

        return produto;

      });

      setProdutos(produtosAtualizados);
      setProdutoEmEdicao(null); // atribui null ao obj em edição, garantir q não entra no if novamente

      {
        setNome("")  // limpa o campo de nome
        setPreco("")  // limpa o campo de preço 
        setEstoque("") // limpa o campo estoque
        setCategoria("");
      }

    } else {

      const novoProduto = {
        id: crypto.randomUUID(), // gera um id único para cada produto
        nome: nome,
        preco: Number(preco),
        estoque: Number(estoque),
        categoria: categoria,
      };

      setProdutos([...produtos, novoProduto]); // spread operator, cria um novo array com os produtos antigos e o novo

      {
        setNome("")  // limpa o campo de nome
        setPreco("")  // limpa o campo de preço 
        setEstoque("") // limpa o campo estoque
        setCategoria("");

      }

    }
  }

  function excluirProduto(id) {
    const produtosAtualizados = produtos.filter(
      (pdt) => pdt.id !== id // só pegaos que são diferentes no id e insere no novo array
    );

    setProdutos(produtosAtualizados);
  }
  function editarProduto(produto) { // recebe o obj correspondente onde o botão está
    setProdutoEmEdicao(produto); // atualiza o variavel do useState produtoEmEdicao
    setNome(produto.nome); // atualiza os campos que estão observ. o useState
    setPreco(produto.preco); // atualiza os campos que estão observ. o useState
    setEstoque(produto.estoque); // atualiza os campos que estão observ. o useState -> preenche a tela
    setCategoria(produto.categoria);
  }

  function cancelaerEdicao() {
    setProdutoEmEdicao(null);
    setNome("");
    setPreco("");
    setEstoque("");
    setCategoria("");
  }

  /* uma requisição pela rede não instantânea, leve algum tempo para retornar resultado, por isso é necessário async e await, 
  para pausar a execução até o resultado chegar. O Async serve apenar para marcar a função como assíncrona. O await serve para 
  pausar a execução da função. */

  async function carregadorProdutos() { // o async é só pra funções assincronas, ele é como um "aviso" pra dizer que a função vai usar await
    const resposta = await fetch("http://localhost:3001/produtos"); // await para aguardar carregar os produtos
    const dados = await resposta.json(); // aguarda resposta em json -> transformar em obj JS

    setProdutos(dados);
  }

  useEffect(() => {
    carregadorProdutos();
  }, []); // o uso do [] fala para o useEffect para executar somente uma vez, quando o componente for montado

  async function cadastrarProduto(novoProduto) {
    const resposta = await fetch("http://localhost:3001/produtos",
      {
        method: "POST",

        header: { // headers são dados adicionais, como "passaporte" para que o servidor entenda o tipo de dado enviado (metadados)
          "Content-Type": "application/json" // informa o formato de como será enviado os dados do body é JSON
        },
        body: JSON.stringify(novoProduto), // transforma em json string, pois o objeto JS precisa ser enviado como JSON
      }
    );

    const produtoCriado = await resposta.json(); // transforma de JSON string p/ objeto JS
    setProdutos([...produtos, produtoCriado]); // adiciona o produto na lista

    /*
        if (!resposta.ok) {
          throw new
        } */

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
        produtoEmEdicao={produtoEmEdicao}
        cancelaerEdicao={cancelaerEdicao}
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