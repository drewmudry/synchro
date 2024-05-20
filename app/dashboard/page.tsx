"use client";
import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { AuthenticatedHeader } from "@/components/auth/AuthenticatedHeader";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center px-8 py-4">
        <AuthenticatedHeader />
        <div>
          <UserButton />
        </div>
      </header>
      <main className="flex-grow">
        <div className="container mx-auto py-8">
          <div>WE HERE</div>
        </div>
      </main>
    </div>
  );
};

export default page;