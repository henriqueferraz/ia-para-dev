/**
 * @fileoverview Layout raiz da aplicação Next.js
 * @module app/layout
 * @description Define o layout base da aplicação, incluindo fontes, metadados
 * e estrutura HTML básica. Este componente envolve todas as páginas da aplicação.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/**
 * Configuração da fonte Geist Sans
 * 
 * @description Define a fonte principal da aplicação e cria uma variável CSS
 * para uso em toda a aplicação.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configuração da fonte Geist Mono
 * 
 * @description Define a fonte monoespaçada da aplicação e cria uma variável CSS
 * para uso em toda a aplicação.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Metadados da aplicação
 * 
 * @description Define o título e descrição que aparecem na aba do navegador
 * e em resultados de busca.
 */
export const metadata: Metadata = {
  title: "Empreendimentos SC - Sistema de Gerenciamento",
  description: "Sistema CRUD para gerenciamento de empreendimentos em Santa Catarina",
};

/**
 * Componente de layout raiz
 * 
 * @description Componente que envolve todas as páginas da aplicação.
 * Define a estrutura HTML básica, aplica as fontes configuradas e renderiza
 * o conteúdo das páginas filhas.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo das páginas filhas
 * @returns {JSX.Element} Estrutura HTML base da aplicação
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
