"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MenuLateral = () => {
  const pathname = usePathname();
  const [colapsado, setColapsado] = useState<boolean>(false);

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
      <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
        <li
          style={{
            padding: "10px",
            background: pathname === "/" ? "#1565c0" : "transparent",
            textAlign: colapsado ? "center" : "left",
          }}
        >
          <Link
            href={"/"}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: colapsado ? "center" : "flex-start",
              gap: colapsado ? 0 : "10px",
            }}
          >
            🏠 {colapsado ? "" : "Home"}
          </Link>
        </li>
        <li
          style={{
            padding: "10px",
            background: pathname === "/usuarios" ? "#1565c0" : "transparent",
            textAlign: colapsado ? "center" : "left",
          }}
        >
          <Link
            href={"/usuarios"}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: colapsado ? "center" : "flex-start",
              gap: colapsado ? 0 : "10px",
            }}
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
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: colapsado ? "center" : "flex-start",
              gap: colapsado ? 0 : "10px",
            }}
          >
            💬 {colapsado ? "" : "Postagens"}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default MenuLateral;