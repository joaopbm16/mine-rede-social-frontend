'use client'

import { useEffect, useState } from "react"
import EmojiPicker from "../componentes/emoji";
import { postagensFindAll, postagensCreate } from "../lib/api/postagens";
import { typePostagem } from "../types/types";
import { useAuth } from "../context/context";

const Postagem = () => {
    const [novaMensagem, setNovaMensagem] = useState<string>("");
    const [mensagem, setMensagem] = useState<typePostagem[]>([]);
    const [showEmoji, setShowEmoji] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { usuarioId, isAuthenticated } = useAuth();

    const handleCarregar = async () => {
        setLoading(true);
        try {
            const response = await postagensFindAll();

            if (response) {
                const mensagens: typePostagem[] = response.map((msg: any) => ({
                    ...msg,
                    nome_usua: msg.usuario.nome_usua,
                    criacao_post: new Date(msg.criacao_post),
                    enviadaPorMim: false,
                }));
                setMensagem(mensagens);
            } else {
                setMensagem([]);
            }
        } catch (error) {
            console.error("Erro ao carregar postagens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleCarregar();
    }, []);

    const handleEnviar = async () => {
        if (!novaMensagem.trim()) return;

        if (!isAuthenticated || !usuarioId) {
            alert("Você precisa estar logado para enviar mensagens");
            return;
        }

        const dadosParaEnviar: typePostagem = {
            usuario_id: usuarioId,
            mensagem_post: novaMensagem,
        };

        try {
            const novaPostagem = await postagensCreate(dadosParaEnviar);

            if (!novaPostagem) {
                const mensagemErroSistema: typePostagem = {
                    id: Date.now(),
                    usuario_id: 0,
                    nome_usua: "Sistema",
                    mensagem_post: "Erro ao enviar a mensagem.",
                    criacao_post: new Date(),
                    enviadaPorMim: false,
                };
                setMensagem((prev) => [...prev, mensagemErroSistema]);
                return;
            }

            // Como novaPostagem é do tipo typePostagemEnviar (sem id e criacao_post), criamos os campos aqui:
            const suaMensagem: typePostagem = {
                id: Date.now(),  // gera um id temporário único
                usuario_id: novaPostagem.usuario_id,
                nome_usua: "Você",
                mensagem_post: novaPostagem.mensagem_post,
                criacao_post: new Date(),  // atribui data atual
                enviadaPorMim: true,
            };

            const mensagemSucessoSistema: typePostagem = {
                id: Date.now() + 1,
                usuario_id: 0,
                nome_usua: "Sistema",
                mensagem_post: "Mensagem enviada com sucesso!",
                criacao_post: new Date(),
                enviadaPorMim: false,
            };

            setMensagem((prev) => [...prev, suaMensagem, mensagemSucessoSistema]);
            setNovaMensagem("");
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);

            const mensagemErroCatch: typePostagem = {
                id: Date.now(),
                usuario_id: 0,
                nome_usua: "Sistema",
                mensagem_post: "Erro ao enviar a mensagem. Tente novamente.",
                criacao_post: new Date(),
                enviadaPorMim: false,
            };
            setMensagem((prev) => [...prev, mensagemErroCatch]);
        }
    };


    return (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2>Mensagens</h2>

            <div style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                height: "400px",
                overflow: "auto",
                marginBottom: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }}>
                {mensagem.map((msg) => (
                    <div key={msg.id} style={{
                        display: "flex",
                        justifyContent: msg.enviadaPorMim ? "flex-start" : "flex-end"
                    }}>
                        <div style={{
                            padding: "8px",
                            borderRadius: "10px",
                            background: msg.enviadaPorMim ? "#1976d2" : "#e0e0e0",
                            color: msg.enviadaPorMim ? "white" : "black",
                            maxWidth: "60%",
                            fontSize: "15px"
                        }}>
                            <strong>{msg.nome_usua}</strong>
                            <p>{msg.mensagem_post}</p>
                            <small>{msg.criacao_post?.toLocaleDateString("pt-BR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}</small>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button style={{
                    padding: "8px 10px",
                    background: "#f0f0f0",
                    color: "white",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                    cursor: "pointer"
                }} onClick={() => setShowEmoji(!showEmoji)}>😀</button>

                {showEmoji && (
                    <EmojiPicker onSelect={(emoji) => {
                        setNovaMensagem((prev) => prev + emoji);
                        setShowEmoji(false);
                    }} />
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

                <button style={{
                    padding: "8px 16px",
                    background: "#1976d2",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                }} onClick={handleEnviar}>Enviar</button>
            </div>
        </div>
    );
};

export default Postagem;
