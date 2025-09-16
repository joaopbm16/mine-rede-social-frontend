import { useState, useEffect } from "react";
import { perfilCreate, perfilUpdate } from "@/app/lib/api/perfil";
import { typePerfil, typeUsuarios } from "@/app/types/types";
import { usuarioFindAll } from "@/app/lib/api/usuarios";
import "./style.css";

interface propsPerfil {
  perfil?: typePerfil;
  onClose: () => void;
  onAtualizar: () => void;
}

const PerfilEditar = ({ perfil, onClose, onAtualizar }: propsPerfil) => {
  const [userid, setUserid] = useState(perfil?.usuario_id ?? 0);
  const [nome_per, setNomePer] = useState(perfil?.nome_per ?? "");
  const [usuarios, setUsuarios] = useState<typeUsuarios[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await usuarioFindAll();
      if (data) setUsuarios(data);
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dados: typePerfil = {
      usuario_id: Number(userid),
      nome_per: nome_per,
    };

    const response = perfil
      ? await perfilUpdate(perfil.id!, dados)
      : await perfilCreate(dados);

    if (response) onAtualizar();
    else alert("Erro ao salvar usuário");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{perfil ? "Editar Perfil" : "Cadastrar Perfil"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Usuário:
            <select
              value={userid}
              onChange={(e) => setUserid(Number(e.target.value))}
              required
              disabled={!!perfil}
            >
              <option value="">Selecione um usuário</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome_usua}
                </option>
              ))}
            </select>
          </label>

          <label>
            Perfil:
            <input
              type="text"
              value={nome_per}
              onChange={(e) => setNomePer(e.target.value)}
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

export default PerfilEditar;
