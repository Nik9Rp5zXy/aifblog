import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

import { Navigation } from "@/components/ui/Navigation";

export const metadata: Metadata = {
  title: "AIFBlog | Yapay Zeka & Teknoloji",
  description: "Yapay zeka, makine öğrenimi ve geleceğin teknolojileri hakkında vizyoner içerikler ve portfolyo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased`}>
        <SmoothScrollProvider>
          <CustomCursor />
          <Navigation />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
