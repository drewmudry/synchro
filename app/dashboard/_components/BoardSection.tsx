// BoardSection.tsx
import React from "react";
import Link from "next/link";
import { Sidebar } from "@/app/dashboard/_components/sidebar";

const BoardSection = () => {
  return (
    <div className="container mx-auto">
      <Link href="/boards">
        <div className="bg-[#661438] p-4 rounded shadow">
          <h2 className="text-xl font-bold text-white mb-4">Boards</h2>
        </div>
      </Link>
    </div>
  );
};

export default BoardSection;