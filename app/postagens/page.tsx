"use client";
import { useState } from "react";

interface Mensagem {
  id: number;
  usuario: string;
  texto: string;
  data: Date;
  enviadaPorMin: boolean;
}

const postagem = () => {
  const [novaMensagem, setNovaMensagem] = useState<string>("");
  const [mensagem, setMensagem] = useState<Mensagem[]>([]);

  const handleEnviar = () => {
    if (!novaMensagem.trim()) return;

    const idBase = mensagem.length + 1;
    const suaMensagem: Mensagem = {
      id: idBase,
      usuario: "Você",
      texto: novaMensagem,
      data: new Date(),
      enviadaPorMin: true,
    };

    const resposta: Mensagem = {
      id: idBase + 1,
      usuario: "Sistema",
      texto: "Mensagem recebida com sucesso",
      data: new Date(),
      enviadaPorMin: false,
    };

    setMensagem([suaMensagem, resposta, ...mensagem]);
    setNovaMensagem("");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Mensagens</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          height: "400px",
          overflow: "auto",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {mensagem &&
          mensagem.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: msg.enviadaPorMin ? "flex-start" : "flex-end",
              }}
            >
              <div
                style={{
                  padding: "8px",
                  borderRadius: "10px",
                  background: msg.enviadaPorMin ? "#1976d2" : "#e0e0e0",
                  color: msg.enviadaPorMin ? "white" : "black",
                  maxWidth: "60%",
                  fontSize: "15px",
                }}
              >
                <strong>{msg.usuario}</strong>
                <p>{msg.texto}</p>
                <small>{msg.data.toLocaleDateString()}</small>
              </div>
            </div>
          ))}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        ></input>

        <button
          style={{
            padding: "8px 16px",
            background: "#1976d2",
            color: "white",
            border: "none",
          }}
          onClick={handleEnviar}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default postagem;