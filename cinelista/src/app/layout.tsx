import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f1f1f",
};

export const metadata: Metadata = {
  title: "Cinelista",
  description:
    "No Cinelista você pode encontrar uma lista dos seus filmes favoritos, e compartilhar com os amigos.",
  metadataBase: new URL("https://cinelista.vercel.app"),
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "preconnect": "https://image.tmdb.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
