export interface typeUsuarios {
    id?: number;
    nome_usua: string;
    email_usua: string;
    senha_usua: string;
}

export interface typePostagem {
    createdAt: string | number | Date;
    id: number;
    usuario_id: number;
    mensagem_post: string;
    criacao_post: Date;
    enviadapormim: boolean;
}



