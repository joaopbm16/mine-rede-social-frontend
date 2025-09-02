import { typePostagem } from "@/app/types/types";



import { useEffect, useState } from "react";


interface Mensagem {
  id: number;
  usuario: string;
  texto: string;
  data: Date;
  enviadaPorMin: boolean;
}

const PostagemPage = () => {
  const [mensagem, setMensagem] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState<string>("");

  useEffect(() => {
    async function carregarPostagens() {
      const postagens = await postagemFindAll();
      if (postagens) {
        const mensagensConvertidas = postagens.map((p) => ({
          id: p.id,
          usuario: "Você",
          texto: p.mensagem_post,
          data: new Date(p.createdAt),
          enviadaPorMin: true,
        }));
        setMensagem(mensagensConvertidas.reverse());
      }
    }

    carregarPostagens();
  }, []);

  // resto do seu componente com handleEnviar etc...

  return (
    
      {/* renderizar mensagens */}
   
  );
};

export default PostagemPage;


// Buscar todas as postagens
export async function postagemFindAll(): Promise<typePostagem[] | undefined> {
    try {
        const response = await fetch("http://localhost:3000/postagens", {
            method: "GET",
        });

        if (response.ok) {
            const data: typePostagem[] = await response.json();
            return data;
        }
    } catch {
        alert("Erro ao buscar postagens");
        return [];
    }
}

// Buscar uma postagem por ID
export async function postagemFindOneById(
    id: number
): Promise<typePostagem | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/postagens/${id}`, {
            method: "GET",
        });

        if (response.ok) {
            const data: typePostagem = await response.json();
            return data;
        }
    } catch {
        return;
    }
}

// Criar nova postagem
export async function postagemCreate(
    body: typePostagem
): Promise<typePostagem | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/postagens`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data: typePostagem = await response.json();
            return data;
        }
    } catch {
        alert("Erro ao criar postagem");
        return undefined;
    }
}

// Atualizar postagem existente
export async function postagemUpdate(
    id: number,
    body: typePostagem
): Promise<typePostagem | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/postagens/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data: typePostagem = await response.json();
            return data;
        }
    } catch {
        alert("Erro ao atualizar a postagem");
        return undefined;
    }
}

// Deletar uma postagem
export async function postagemDelete(
    id: number
): Promise<typePostagem | undefined> {
    try {
        const response = await fetch(`http://localhost:3000/postagens/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const data: typePostagem = await response.json();
            return data;
        }
    } catch {
        alert("Erro ao deletar a postagem");
        return undefined;
    }
}
