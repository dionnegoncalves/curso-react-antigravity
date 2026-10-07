function ProdutoItem({
    produto,
    excluirProduto,
    editarProduto,
}) {

    return (
        <li className="flex flex-row gap-2  justify-center" key={produto.id}>
            <div className="flex flex-row gap-5 px-2 py-2 border-2 border-gray-400 rounded md:mx-auto">
                <strong>{produto.nome}</strong>

                <p>
                    {produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </p>

                <p>
                    {produto.estoque === 0
                        ? <strong>ESGOTADO</strong>
                        : `Estoque: ${produto.estoque}`} {/* {produto.estoque === 0 && <strong>ESGOTADO</strong>} */}
                </p>

                <p>
                    {"Categoria: "}
                    {produto.categoria}
                </p>
            </div>

            <button className="text-blue-600 hover:text-blue-800 bg-blue-200 rounded-md px-2 gap-2" onClick={() => editarProduto(produto)}>
                Editar
            </button>

            <button className="text-red-600 hover:text-red-800 bg-red-200 rounded-md px-2 gap-2" onClick={() => excluirProduto(produto.id)}>
                Excluir
            </button>

        </li>

    );
}

export default ProdutoItem;