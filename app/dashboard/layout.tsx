"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

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
              {children}
            </div>
        </ConvexClientProvider>
    </main>
  );
}
