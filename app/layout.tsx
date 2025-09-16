import MenuLateral from "./componentes/menuLateral";
import { AuthProvider } from "./context/context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, fontFamily: "Arial, Sans-serif" }}>
        <AuthProvider>
          <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
            <MenuLateral />
            <main style={{ flex: 1, padding: "20 px" }}>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
