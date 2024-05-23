// Boards.tsx
import React from "react";
import { AuthenticatedHeader } from "@/components/auth/AuthenticatedHeader";
import Link from "next/link";
import { Topbar } from "@/app/_components/topbar";

const BoardSection = () => {
  return (
    <div className="container mx-auto">
      <Link href="/boards">
        <div className="bg-[#661438] p-4 rounded shadow">
          <h2 className="text-xl font-bold text-white mb-4">Boards</h2>
          <div className="grid grid-cols-4 gap-4">
            <Link href="/boards/1">
              <div className="bg-white p-4 rounded relative">
                <img src="/placeholder.svg" alt="Logo" className="absolute top-2 right-2 h-6 w-6" />
                <h3 className="text-lg font-bold mb-2">Board 1</h3>
                <p className="text-gray-600">Board description goes here</p>
              </div>
            </Link>
            <Link href="/boards/2">
              <div className="bg-white p-4 rounded relative">
                <img src="/placeholder.svg" alt="Logo" className="absolute top-2 right-2 h-6 w-6" />
                <h3 className="text-lg font-bold mb-2">Board 2</h3>
                <p className="text-gray-600">Board description goes here</p>
              </div>
            </Link>
            <Link href="/boards/3">
              <div className="bg-white p-4 rounded relative">
                <img src="/placeholder.svg" alt="Logo" className="absolute top-2 right-2 h-6 w-6" />
                <h3 className="text-lg font-bold mb-2">Board 3</h3>
                <p className="text-gray-600">Board description goes here</p>
              </div>
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BoardSection;