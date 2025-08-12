import { FormEvent, useState } from "react";
import { usuarioCreate, usuarioUpdate } from "../lib/api/usuarios";

interface proposUsuario {
    usuario?: any;
    onClose: () => void;
    onAtualizar: () => void;
}

const UsuarioEditar = (props: proposUsuario) => {
    const [nome, setNome] = useState(props.usuario?.nome_usua ?? "");
    const [email, setEmail] = useState(props.usuario?.email_usua ?? "");
    const [senha, setSenha] = useState(props.usuario?.senha_usua ?? "");

    async function handleSumit(e: FormEvent) {
        e.preventDefault();

        const usuarioAtualizado = {
            nome_usua: nome,
            email_usua: email,
            senha_usua: senha,
        };



        let response
        if (props.usuario) {
            response = await usuarioUpdate(props.usuario.id, usuarioAtualizado);
        } else {
            response = await usuarioCreate(usuarioAtualizado);
        }

        if (response) {
            props.onAtualizar();
        } else {
            alert("Erro ao atualizar o usuário")
        }
    }

    return (
        <div style={{ border: '1px solid black', padding: 25, marginTop: 20, maxWidth: "250px" }}>
            <h2>{!props.usuario ? "Cadastrar Usuário" : "Editar Usuário"}</h2>
            <form onSubmit={handleSumit}>
                <div>
                    <label>Nome:</label>
                    <input value={nome}
                        onChange={(e) => setNome(e.target.value)}></input>
                </div>

                <div>
                    <label>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label>Senha:</label>
                    <input value={senha} onChange={(e) => setSenha(e.target.value)}></input>
                </div>

                <button type="submit">Salvar</button>
                <button type="button" onClick={props.onClose}>Cancelar </button>
            </form>
        </div>
    );
};

export default UsuarioEditar