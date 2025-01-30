import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Tulip",
  description: "A simple chat-bot made by Amuif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
        suppressContentEditableWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
              <section className="flex gap-5 m-3">
                <SidebarTrigger className="top-5 left-5" />
                <Navbar />
              </section>{" "}
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
