"use client"
import { Inter } from "next/font/google";
import "../globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <ConvexClientProvider>
            <div className="h-full flex">
              <Toaster position="bottom-center" />
              {children}
            </div>
        </ConvexClientProvider>
    </main>
  );
}
