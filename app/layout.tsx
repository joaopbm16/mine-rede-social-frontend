import MenuLateral from "./componentes/menuLateral";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <div
          style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}
        >
          <MenuLateral />
          <main style={{flex: 1, padding: '20px'}}>{children}</main>
        </div>
      </body>
    </html>
  );
}