"use client";

import LandingComponent from "@/components/landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
     
      <main className="w-full">
          <LandingComponent />
        </main>
    </QueryClientProvider>
  );
}
