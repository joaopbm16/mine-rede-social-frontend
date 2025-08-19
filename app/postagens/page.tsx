'use client'
import { handler } from "next/dist/build/templates/app-page";
import { useState } from "react";

interface Mensagem {
    id: number;
    usuario: string;
    texto: string;
    data: Date;
    enviaPorUsuario: Boolean;
}

const postagem = () => {
const [novaMensagem, setNovaMensagem] = useState<string> ("");
const [mensagem, setMensagem] = useState<any[]>([]);

const handlerEnviar = () => {
    if(!novaMensagem.trim()) return;
    const suaMensagem: Mensagem = {
        id: 0,
        usuario: "Você",
        texto: novaMensagem,
        data: new Date(),
        enviaPorUsuario: true
    }
setMensagem([suaMensagem])
setNovaMensagem('')
}

    return (
        <div>
            <h2>Mensagens</h2>
            <div>{mensagem && mensagem.map((msg) => 
                    <div>
                        <strong>{msg.usuario}</strong>
                        <p>{msg.texto}</p>
                        <small>{msg.data.toLocaleTimeString()}</small>
                    </div>
                 )} </div>
            <div>
                <input
                type="text"
                 placeholder="Digite sua mensagem ..."
                 value={novaMensagem}
                 onChange={(e) => setNovaMensagem (e.target.value)}
                >
                </input>
            </div>
            <button onClick={(handlerEnviar)}>Enviar</button>
        </div>
    )
}

export default postagem