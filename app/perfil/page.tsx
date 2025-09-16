"use client";

import { useEffect, useState } from "react";
import { typePerfil } from "../types/types";
import { perfilDelete, perfilFindAll } from "../lib/api/perfil";
import "./page.css";
import PerfilEditar from "../componentes/perfil/perfilEditar";

const Perfil = () => {
  const [perfil, setPerfil] = useState<typePerfil[]>([]);
  const [perfilSelecionado, setPerfilSelecionado] =
    useState<typePerfil | null>();
  const [cadastrarPerfil, setCadastrarPerfil] = useState(false);

  useEffect(() => {
    fetchBuscaPerfil();
  }, []);

  const fetchBuscaPerfil = async () => {
    const response = await perfilFindAll();
    if (response) {
      setPerfil(response);
    } else {
      return [];
    }
  };

  const handleEditar = async (perfil: typePerfil) => {
    setPerfilSelecionado(perfil);
  };

  const handleExcluir = async (id: number) => {
    const response = await perfilDelete(id);

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
        <h2>Lista de Perfis</h2>
        <button className="btn-edit" onClick={() => setCadastrarPerfil(true)}>
          Adicionar
        </button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuário</th>
              <th>User ID</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {perfil.map((perfil) => (
              <tr key={perfil.id}>
                <td>{perfil.id}</td>
                <td>{perfil.usuario?.nome_usua}</td>
                <td>{perfil.usuario_id}</td>
                <td>{perfil.nome_per}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEditar(perfil)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleExcluir(perfil.id!)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {perfilSelecionado && (
        <PerfilEditar
          perfil={perfilSelecionado}
          onClose={() => setPerfilSelecionado(null)}
          onAtualizar={async () => {
            await fetchBuscaPerfil();
            setPerfilSelecionado(null);
          }}
        />
      )}

      {cadastrarPerfil && (
        <PerfilEditar
          onClose={() => setCadastrarPerfil(false)}
          onAtualizar={async () => {
            await fetchBuscaPerfil();
            setCadastrarPerfil(false);
          }}
        />
      )}
    </div>
  );
};

export default Perfil;
