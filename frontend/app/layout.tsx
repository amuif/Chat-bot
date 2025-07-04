import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { Toaster } from "sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Axon Chat bot",
  description:
    "Axon is a smart and intuitive AI-powered chatbot designed to provide instant, accurate, and engaging conversations. Whether you need quick answers, coding assistance, or general knowledge, Axon is here to help.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable}  ${geistMono.variable} antialiased`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <Toaster />
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
