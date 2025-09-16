"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./context/context";
import { usuarioFindOneByEmailPass } from "./lib/api/usuarios";
import { typeUsuarios } from "./types/types";

const Index = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [usuarios, setUsuarios] = useState<typeUsuarios>();
  const [erro, setErro] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const fetchBuscaUsuario = async (email: string, pass: string) => {
    const response = await usuarioFindOneByEmailPass(email, pass);
    if (response) {
      setUsuarios(response);
      setErro("");

      login(response.id);

      router.push("/postagens");
    } else {
      setErro("email ou senha inválida");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#1976d2", marginBottom: "20px" }}>
          Mini Rede Social
        </h1>
        <p style={{ fontSize: "14px", marginBottom: "20px", color: "#555" }}>
          Faça login para continuar
        </p>

        <input
          style={{
            width: "100%", // 👈 ajustei pra 100% em vez de 94%
            marginBottom: "12px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
            boxSizing: "border-box",
          }}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          style={{
            width: "100%", // 👈 idem aqui
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
            boxSizing: "border-box",
          }}
          type="password"
          placeholder="Senha"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />

        {erro && (
          <p style={{ color: "red", font: "14px", marginBottom: "10px" }}>
            {erro}
          </p>
        )}

        <button
          onClick={() => fetchBuscaUsuario(email, pass)}
          style={{
            width: "100%",
            padding: "12px",
            background: "#1976d2",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s ease, transform 0.2s ease",
          }}
        >
          Entrar
        </button>

        <p
          style={{
            marginTop: "15px",
            fontSize: "13px",
            color: "#555",
          }}
        >
          Ainda não tem conta?{" "}
          <Link style={{ color: "#19762d" }} href={"/usuarios"}>
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Index;