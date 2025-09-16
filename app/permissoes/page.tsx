"use client";

import { useEffect, useState } from "react";
import { typePermissoes } from "../types/types";
import { permissoesDelete, permissoesFindAll } from "../lib/api/permissoes";
import "./page.css";
import PermissoesEditar from "../componentes/permissoes/permissoesEditar";

const Permissoes = () => {
  const [permissao, setPermissao] = useState<typePermissoes[]>([]);
  const [permissaoSelecionada, setPermissaoSelecionada] =
    useState<typePermissoes | null>();
  const [cadastrarPermissao, setCadastrarPermissao] = useState(false);

  useEffect(() => {
    fetchBuscaPerfil();
  }, []);

  const fetchBuscaPerfil = async () => {
    const response = await permissoesFindAll();
    if (response) {
      setPermissao(response);
    } else {
      return [];
    }
  };

  const handleEditar = async (perfil: typePermissoes) => {
    setPermissaoSelecionada(perfil);
  };

  const handleExcluir = async (id: number) => {
    const response = await permissoesDelete(id);

    if (response) {
      alert("Usuário excluido com sucesso");
      fetchBuscaPerfil();
    } else {
      alert("Erro ao excluir o usuário");
    }
  };

  return (
    <div className="table-container">
      <div>
        <h2>Lista de Permissões</h2>
        <button
          className="btn-edit"
          onClick={() => setCadastrarPermissao(true)}
        >
          Adicionar
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Create</th>
              <th>Update</th>
              <th>Delete</th>
              <th>View</th>
              <th>ID Perfil</th>
              <th>Tabela</th>
              <th>Perfil</th>
              <th>Usuario</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {permissao.map((permissao) => (
              <tr key={permissao.id}>
                <td>{permissao.id}</td>
                <td>{permissao.create ? "✅" : "❌"}</td>
                <td>{permissao.update ? "✅" : "❌"}</td>
                <td>{permissao.delete ? "✅" : "❌"} </td>
                <td>{permissao.view ? "✅" : "❌"}</td>
                <td>{permissao.id_perfil}</td>
                <td>{permissao.nome_tabela}</td>
                <td>{permissao.perfil?.nome_per}</td>
                <td>{permissao.perfil?.usuario?.nome_usua}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditar(permissao)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleExcluir(permissao.id!)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {permissaoSelecionada && (
        <PermissoesEditar
          permissoes={permissaoSelecionada}
          onClose={() => setPermissaoSelecionada(null)}
          onAtualizar={async () => {
            await fetchBuscaPerfil();
            setPermissaoSelecionada(null);
          }}
        />
      )}

      {cadastrarPermissao && (
        <PermissoesEditar
          onClose={() => setCadastrarPermissao(false)}
          onAtualizar={async () => {
            await fetchBuscaPerfil();
            setCadastrarPermissao(false);
          }}
        />
      )}
    </div>
  );
};

export default Permissoes;
