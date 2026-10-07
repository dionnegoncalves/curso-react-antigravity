import ProdutoItem from "./ProdutoItem";

function ListaProdutos({
    produtos,
    excluirProduto,
    editarProduto,
}) {

    if (produtos.length === 0) { // length qtde de itens em um array 
        return (
            < p >
                Nenhum produto cadastrado
            </p >
        );
    }


    return (
        <> {/* parent element"*/}
            <div className="mt-15">
                <h2>Produtos Cadastrados</h2>

                <ul>
                    {produtos.map((produto) => (
                        <ProdutoItem
                            key={produto.id}
                            produto={produto}
                            editarProduto={editarProduto}
                            excluirProduto={excluirProduto}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ListaProdutos;