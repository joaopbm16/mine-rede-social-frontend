import { ReactNode, useState } from "react";

interface proposUsuario {
    usuario: any;
    onClose: () => void;
}

const UsuarioEditar = (props: proposUsuario) => {
    const [nome, setNome] = useState(props.usuario.nome_usua);
    const [email, setEmail] = useState(props.usuario.email_usua);
    const [senha, setSenha] = useState(props.usuario.senha_usua);

    return (
        <div style={{ border: '1px solid black', padding: 25, marginTop: 20, maxWidth: "250px" }}>
            <h2>Editar Usuário</h2>
            <form >
                <div>
                    <label>Nome:</label>
                    <input value={nome}
                        onChange={(e) => setNome(e.target.value)}></input>
                    <div>

                        <label>Email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>

                    </div>

                </div>
                <label>Senha:</label>
                <input value={senha}onChange={(e) => setSenha(e.target.value)}></input>
                <div>

                </div>
                <button>Salvar</button>
                <button type="button" onClick={props.onClose}>Cancelar </button>
            </form>
        </div>
    );
};

export default UsuarioEditar