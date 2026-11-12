function Header({ logout }) { // props tem que ter chaves
    return (
        <>
            <h1>Produtos Cadastrados</h1>
            <button onClick={logout}>Sair</button>

        </>
    );

}

export default Header; 