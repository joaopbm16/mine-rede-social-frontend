"use client";
import { useEffect, useState } from "react";
import EmojiPicker from "../componentes/emoji";
import { postagemCreate, postagemFindAll } from "../lib/api/postagens";


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
  const [showEmoji, setShowEmoji] = useState<boolean>(false);

  // ⬇️ Carregar mensagens salvas do backend
  useEffect(() => {
    async function carregarPostagens() {
      const postagens = await postagemFindAll();
      if (postagens) {
        const mensagensConvertidas = postagens.map((p) => ({
          id: p.id,
          usuario: "Você", // ou use o nome real, se disponível
          texto: p.mensagem_post,
          data: new Date(p.createdAt),
          enviadaPorMin: true,
        }));
        setMensagem(mensagensConvertidas.reverse()); // do mais antigo ao mais recente
      }
    }

    carregarPostagens();
  }, []);

  // ⬇️ Enviar nova mensagem
  const handleEnviar = async () => {
    if (!novaMensagem.trim()) return;

    const usuario_id = 1; // ⚠️ Substitua pelo ID real do usuário logado


  
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
        {mensagem.map((msg) => (
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
        <button
          style={{
            padding: "8px 12px",
            background: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={() => setShowEmoji(!showEmoji)}
        >
          😀
        </button>

        {showEmoji && (
          <EmojiPicker
            onSelect={(emoji) => {
              setNovaMensagem((prev) => prev + emoji);
              setShowEmoji(false);
            }}
          />
        )}

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
        />

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
