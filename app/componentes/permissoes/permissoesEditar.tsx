import {
  permissoesCreate,
  permissoesUpdate,
} from "@/app/lib/api/permissoes";
import { typePerfil, typePermissoes, typeUsuarios } from "@/app/types/types";
import { useEffect, useState } from "react";
import "./style.css"; 
import { perfilFindAll } from "@/app/lib/api/perfil";

interface propsPermissoes {
  permissoes?: typePermissoes;
  onClose: () => void;
  onAtualizar: () => void;
}

const PermissoesEditar = ({
  permissoes,
  onClose,
  onAtualizar,
}: propsPermissoes) => {
  const [createBool, setCreateBool] = useState(permissoes?.create ?? false);
  const [updateBool, setUpdateBool] = useState(permissoes?.update ?? false);
  const [deleteBool, setDeleteBool] = useState(permissoes?.delete ?? false);
  const [viewBool, setViewBool] = useState(permissoes?.view ?? true);
  const [idPerfil, setIdPerfil] = useState(permissoes?.id_perfil ?? 0);
  const [nomeTabela, setNomeTabela] = useState(permissoes?.nome_tabela ?? "");
  const [carregarPerfil, setCarregarPerfil] = useState<typePerfil[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      const data = await perfilFindAll();
      if (data) setCarregarPerfil(data);
    };
    fetchDados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dados: typePermissoes = {
      create: createBool,
      update: updateBool,
      delete: deleteBool,
      view: viewBool,
      id_perfil: idPerfil,
      nome_tabela: nomeTabela,
    };
    const response = permissoes
      ? await permissoesUpdate(permissoes.id!, dados)
      : await permissoesCreate(dados);

    if (response) onAtualizar();
    else alert("Erro ao salvar permissões");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{permissoes ? "Editar Permissões" : "Cadastrar Permissões"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Create:
            <input
              type="checkbox"
              checked={createBool}
              onChange={(e) => setCreateBool(e.target.checked)}
            />
          </label>
          <label>
            Update:
            <input
              type="checkbox"
              checked={updateBool}
              onChange={(e) => setUpdateBool(e.target.checked)}
            />
          </label>
          <label>
            Delete:
            <input
              type="checkbox"
              checked={deleteBool}
              onChange={(e) => setDeleteBool(e.target.checked)}
            />
          </label>
          <label>
            View:
            <input
              type="checkbox"
              checked={viewBool}
              onChange={(e) => setViewBool(e.target.checked)}
            />
          </label>
          <label>
            Usuário (ID do Perfil):
            <select
              value={idPerfil}
              onChange={(e) => setIdPerfil(Number(e.target.value))}
              required
            >
              <option value={0}>Selecione um usuário</option>
              {carregarPerfil.map((perfil) => (
                <option key={perfil.id} value={perfil.id}>
                  {perfil.usuario?.nome_usua}
                </option>
              ))}
            </select>
          </label>
          <label>
            Nome da Tabela:
            <input
              type="text"
              value={nomeTabela}
              onChange={(e) => setNomeTabela(e.target.value)}
              required
            />
          </label>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissoesEditar;
