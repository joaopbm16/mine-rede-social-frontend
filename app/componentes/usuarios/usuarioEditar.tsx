import React, { useState } from "react";
import { usuarioCreate, usuarioUpdate } from "../../lib/api/usuarios";
import "./style.css";
import { typeUsuarios } from "@/app/types/types";

interface propsUsuario {
  usuario?: typeUsuarios;
  onClose: () => void;
  onAtualizar: () => void;
}

const UsuarioEditar = ({ usuario, onClose, onAtualizar }: propsUsuario) => {
  const [nome, setNome] = useState(usuario?.nome_usua ?? "");
  const [email, setEmail] = useState(usuario?.email_usua ?? "");
  const [senha, setSenha] = useState(usuario?.senha_usua ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dados: typeUsuarios = {
      nome_usua: nome,
      email_usua: email,
      senha_usua: senha
    };
    const response = usuario
      ? await usuarioUpdate(usuario.id!, dados)
      : await usuarioCreate(dados);

    if (response) onAtualizar();
    else alert("Erro ao salvar usuário");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{usuario ? "Editar Usuário" : "Cadastrar Usuário"}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Senha:
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
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

export default UsuarioEditar;