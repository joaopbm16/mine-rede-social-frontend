'use client'

import { useEffect, useState } from "react";
import { usuarioDelete, usuarioFindAll } from "../lib/api/usuarios";
import UsuarioEditar from "../componentes/usuarioEditar";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<any[]>([])
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<any | null>(null)
    const [cadastrarUsuario, setCadastrarUsuario] = useState(false);

    useEffect(() => {
        fetchBuscaUsuario()
    }, []);

    async function fetchBuscaUsuario() {
        const response = await usuarioFindAll();
        if (response) {
            setUsuarios(response)
        } else {
            return [];
        }
    }

    function handleEditar(usuario: any) {
        setUsuarioSelecionado(usuario);
    }

    async function handleExcluir(id: any) {
        const response = await usuarioDelete(id)
        if (response) {
            fetchBuscaUsuario()
        }

    }

    return (
        <>
            <div>
                <h2>Lista de Usuário</h2>
                <><button onClick={() => setCadastrarUsuario(true)}>Adicionar</button></>
                <table border={1} cellPadding={5} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do usuario</th>
                            <th>e-mail</th>
                            <th>senha</th>
                            <th>ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome_usua}</td>
                                <td>{usuario.email_usua}</td>
                                <td>{usuario.senha_usua}</td>
                                <td>
                                    <button onClick={() => handleEditar(usuario)}>Editar</button>
                                    <button onClick={() => handleExcluir(usuario.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {usuarioSelecionado && (
                <UsuarioEditar
                    usuario={usuarioSelecionado}
                    onClose={() => setUsuarioSelecionado(null)}
                    onAtualizar={async () => {
                        await fetchBuscaUsuario();
                        setUsuarioSelecionado(null)
                    }
                    } />
            )}

            {cadastrarUsuario && (
                <UsuarioEditar
                    onClose={() => setCadastrarUsuario(false)}
                    onAtualizar={async () => {
                        await fetchBuscaUsuario();
                        setCadastrarUsuario(false)
                    }
                    } />
            )}
        </>
    );
};

export default Usuarios


