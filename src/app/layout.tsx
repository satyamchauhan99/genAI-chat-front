import type { ReactNode } from "react";
import Navbar from "@components/Navbar";
import "./globals.css";

export const metadata = {
  title: "DocAI",
  description: "Document-based Q&A powered by AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
