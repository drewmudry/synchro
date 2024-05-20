import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/providers/convex-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Boards",
  description: "Boards page",
};

export default function BoardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <ConvexClientProvider>
        {children}
      </ConvexClientProvider>
    </div>
  );
}