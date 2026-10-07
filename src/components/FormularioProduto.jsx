function FormularioProduto({
    nome,
    preco,
    estoque,
    categoria,
    setNome,
    setPreco,
    setEstoque,
    setCategoria,
    adicionarProduto,
    produtoEmEdicao,
    cancelaerEdicao,
}) {

    return (
        <form className="flex flex-col max-w-md mx-auto gap-5 " onSubmit={adicionarProduto /*não está passando o que será inserido ou editado como parâmetro*/}>
            <input className="border-2 border-gray-400 rounded"
                type="text"
                placeholder="Nome do produto"
                value={nome}
                onChange={(event) => setNome(event.target.value)} />

            <input className="border-2 border-gray-400 rounded"
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(event) => setPreco(event.target.value)} />

            <input className="border-2 border-gray-400 rounded"
                type="number"
                placeholder="Estoque"
                value={estoque}
                onChange={(event) => setEstoque(event.target.value)} />

            <select className="border-2 border-gray-400 rounded"
                value={categoria} onChange={(event) => setCategoria(event.target.value)}>
                <option value=""> Selecione </option>
                <option value="Pães"> Pães </option>
                <option value="Bolos"> Bolos </option>
                <option value="Salgados"> Salgados </option>
            </select>

            {/*
            <p>Nome: {nome}</p>
            <p>Preço: {preco}</p>
            <p>Estoque: {estoque}</p>
            <p>Categoria: {categoria}</p> 
            */}

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-teal-500 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
                type='submit'>
                {produtoEmEdicao // se tiver obj na variável altera o texto
                    ? "Salvar alterações"
                    : "Adicionar produto"
                }
            </button>

            {produtoEmEdicao && (// type=button para evitar que o site tente enviar o form
                <button type="button" onClick={cancelaerEdicao}>
                    Cancelar
                </button>
            )}

        </form>
    );
}

export default FormularioProduto;