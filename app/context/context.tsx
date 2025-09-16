"use client"

import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextType = {
    login: (usuarioId: number) => void; // Passando o ID do usuário ao fazer login
    logout: () => void;
    isAuthenticated: boolean;
    usuarioId?: number; // Adicionando o ID do usuário
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [usuarioId, setUsuarioId] = useState<number | undefined>(undefined); // Estado para armazenar o ID do usuário

    const login = (id: number) => {
        setIsAuthenticated(true);
        setUsuarioId(id); // Armazena o ID do usuário após o login
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsuarioId(undefined); // Limpa o ID ao fazer logout
    };

    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated, usuarioId}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context)
        throw new Error ("useAuth deve ser usado dentro do AuthProvider");

    return context;
}