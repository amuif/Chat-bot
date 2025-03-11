import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/nav-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
        className={`${inter.variable}  ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}

//<SidebarProvider>
//          <AppSidebar />
//          <main className="w-full">
//            <section className="flex gap-5 m-3">
//              <SidebarTrigger className="top-5 left-5" />
//              <Navbar />
//            </section>{" "}
//
//          </main>
//        </SidebarProvider>
