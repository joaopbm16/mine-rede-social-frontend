"use client"

import { useEffect, useState } from "react"
import { usuarioDelete, usuarioFindAll } from "../lib/api/usuarios"
import UsuarioEditar from "../componentes/usuarios/usuarioEditar";
import "./page.css"
import { typeUsuarios } from "../types/types";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<typeUsuarios[]>([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<typeUsuarios | null>();
    const [cadastrarUsuario, setCadastrarUsuario] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState<Record<number, boolean>>({});

    useEffect(() => {
        fetchBuscaUsuario();
    }, []);

    const fetchBuscaUsuario = async () => {
        const response = await usuarioFindAll()
        if (response) {
            setUsuarios(response)
        } else {
            return []
        };
    };

    const handleEditar = (usuario: typeUsuarios) => {
        setUsuarioSelecionado(usuario);
    }

    const handleExcluir = async (id: number) => {

        const response = await usuarioDelete(id);

        if (response) {
            alert("Usuário excluido com sucesso")
            fetchBuscaUsuario();
        } else {
            alert("Erro ao excluir o usuário")
        }
    }

    const handleSenha = (id: number) => {
        setSenhaVisivel((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="table-container">
            <div>
                <h2>Lista de Uusários</h2>
                <button className="btn-edit" onClick={() => setCadastrarUsuario(true)}>Adicionar</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Senha</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome_usua}</td>
                                <td>{usuario.email_usua}</td>
                                <td>{senhaVisivel[usuario.id!] ? usuario.senha_usua : "*".repeat(usuario.senha_usua.length)}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => handleSenha(usuario.id!)}>{senhaVisivel[usuario.id!] ? "👁️" : "👀"}</button>
                                    <button className="btn-edit" onClick={() => handleEditar(usuario)}>Editar</button>
                                    <button className="btn-delete" onClick={() => handleExcluir(usuario.id!)}>Excluir</button>
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
                        setUsuarioSelecionado(null);
                    }}
                />
            )}

            {cadastrarUsuario && (
                <UsuarioEditar
                    onClose={() => setCadastrarUsuario(false)}
                    onAtualizar={async () => {
                        await fetchBuscaUsuario();
                        setCadastrarUsuario(false);
                    }}
                />
            )}
        </div>
    );
};

export default Usuarios