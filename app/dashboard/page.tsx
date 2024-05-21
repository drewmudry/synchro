"use client";
import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { AuthenticatedHeader } from "@/components/auth/AuthenticatedHeader";
import Link from "next/link";
import { Topbar } from './_components/topbar';
import OrganizationSelector from "./_components/organization-selector";

const page = () => {
    return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center px-8 py-4 bg-[#F5EBDE]">
        <AuthenticatedHeader />
      </header>
      <Topbar />
      <main className="flex-grow bg-[#F5EBDE] py-8">
        <div className="container mx-auto">
          <div className="grid grid-rows-3 gap-8">
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
                  {/* Repeat the above structure for Board 4 */}
                </div>
              </div>
            </Link>
            <Link href="/tasks">
              <div className="bg-[#661438] p-4 rounded shadow">
                <h2 className="text-xl font-bold text-white mb-4">Tasks</h2>
                {/* Render user's recent tasks */}
                <div className="grid grid-cols-4 gap-4">
                  <Link href="/tasks/1">
                    <div className="bg-white p-4 rounded relative">
                      <img src="/placeholder.svg" alt="Logo" className="absolute top-2 right-2 h-6 w-6" />
                      <h3 className="text-lg font-bold mb-2">Task 1</h3>
                      <p className="text-gray-600">Task description goes here</p>
                    </div>
                  </Link>
                  {/* Repeat the above structure for Task 2, 3, and 4 */}
                </div>
              </div>
            </Link>
            <Link href="/notes">
              <div className="bg-[#661438] p-4 rounded shadow">
                <h2 className="text-xl font-bold text-white mb-4">Notes</h2>
                {/* Render user's recent notes */}
                <div className="grid grid-cols-4 gap-4">
                  <Link href="/notes/1">
                    <div className="bg-white p-4 rounded relative">
                      <img src="/placeholder.svg" alt="Logo" className="absolute top-2 right-2 h-6 w-6" />
                      <h3 className="text-lg font-bold mb-2">Note 1</h3>
                      <p className="text-gray-600">Note content goes here</p>
                    </div>
                  </Link>
                  {/* Repeat the above structure for Note 2, 3, and 4 */}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;