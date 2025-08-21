import Link from "next/link";

const Index = () => {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "transparent",
    }}>
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

      <p style={{ fontSize: "14px", marginBottom: "20px", color: "#555" }}>Faça login para continuar</p>


      <input
        style={{
          width: "94%",
          marginBottom: "12px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          transition: "border-color 0.3s",
        }}
        type="email"
        placeholder="E-mail"
      ></input>

      <input
        style={{
          width: "94%",
          marginBottom: "12px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          outline: "none",
          transition: "border-color 0.3s",
        }}
        type="Password"
        placeholder="Senha"
      ></input>

      <button
        style={{
          width:"100%",
          padding:"12px",
          background: "#1976d2",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "backgroud 0.3s aese, transform 0.2s aese",
        }}
       >
        Entrar
      </button>

      <p style={{
        marginTop: "15px",
        fontSize: "13px",
        color: "#555",
      }}
      >
        Ainda não tem conta? {" "}
        <Link style={{ color: "#19762d" }} href={"/usuarios"}>
          Cadastre-se
        </Link>
      </p>
    </div>
    </div>

  );
};

export default Index