import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Café com Letras | Savassi, Belo Horizonte",
  description:
    "Desde 1996, o Café com Letras une gastronomia requintada, literatura, jazz e cultura no coração da Savassi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#12110f] font-sans text-[#f5f0e6] antialiased">
        {children}
      </body>
    </html>
  );
}
