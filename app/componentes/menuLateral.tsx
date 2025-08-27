//Menu Lateral

"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/context";

const MenuLateral = () => {
  const pathname = usePathname();
  const [colapsado, setColapsado] = useState<boolean>(false);

  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const abandonar = () => {
    logout();
    router.push("/");
  };

  return (
    <aside
      style={{
        width: colapsado ? "60px" : "180px",
        background: "#1976d2",
        color: "white",
        borderRight: "1px solid #ccc",
        padding: "20px",
        transition: "width 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: colapsado ? "center" : "flex-start",
      }}
    >
      <button
        onClick={() => setColapsado(!colapsado)}
        style={{
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer",
          alignSelf: colapsado ? "center" : "flex-end",
          marginBottom: "20px",
        }}
      >
        {colapsado ? ">" : "<"}
      </button>

      <h3>Menu</h3>

      {isAuthenticated ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
          <li
            style={{
              padding: "10px",
              background: pathname === "/usuarios" ? "#1565c0" : "transparent",
              textAlign: colapsado ? "center" : "left",
            }}
          >
            <Link
              href={"/usuarios"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              👤 {colapsado ? "" : "Usuários"}
            </Link>
          </li>

          <li
            style={{
              padding: "10px",
              background: pathname === "/postagens" ? "#1565c0" : "transparent",
              textAlign: colapsado ? "center" : "left",
            }}
          >
            <Link
              href={"/postagens"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              💬 {colapsado ? "" : "Postagens"}
            </Link>
          </li>

          {/* Botão de logout */}
          <li style={{ padding: "10px", marginTop: "auto" }}>
            <button
              onClick={abandonar}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              🔓 {colapsado ? "" : "Sair"}
            </button>
          </li>
        </ul>
      ) : (
        <p style={{ marginTop: "20px" }}>🔒 {colapsado ? "" : "Faça login"}</p>
      )}
    </aside>
  );
};

export default MenuLateral;