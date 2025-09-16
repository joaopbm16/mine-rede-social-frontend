export interface typeUsuarios {
    id: number;
    nome_usua: string;
    email_usua: string;
    senha_usua: string;
}


export interface typePostagem {
    id?: number;
    nome_usua?: string;
    usuario_id: number;
    mensagem_post: string;
    criacao_post?: Date;
    enviadaPorMim?: boolean;
  }
  
export interface typePerfil {
    usuario?: {
        nome_usua: string;
      };
    id?: number;
    usuario_id: number;
    nome_per: string;
}

export interface typePermissoes {
    id?: number;
    create: boolean;
    update: boolean;
    delete: boolean;
    view: boolean;
    id_perfil: number;
    nome_tabela: string;
    perfil?: {
        nome_per?: string;
        usuario?: {
            id?: number;
            nome_usua?: string;
        };
      };
}