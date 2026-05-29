"use client";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "glass-strong rounded-2xl",
          },
        }}
      />
    </ThemeProvider>
  );
}
