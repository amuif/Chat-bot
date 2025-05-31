"use client";

import LandingComponent from "@/components/landing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
