"use client";
import React, { useState } from "react";
import { Sidebar } from "@/app/dashboard/_components/sidebar";
import BoardSection from "@/app/dashboard/_components/BoardSection";
import Home from "./_components/home";
import Topbar from "./_components/topbar";
import { useOrganization } from "@clerk/clerk-react";
import { EmptyOrg } from "./_components/EmptyOrg";

const Page = () => {
  const { organization } = useOrganization();
  const [selectedSpan, setSelectedSpan] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderSelectedComponent = () => {
    if (!organization) {
      return <EmptyOrg />;
    }
    switch (selectedSpan) {
      case "Boards":
        return <BoardSection />;
      case "Home":
        return <Home />;
      // case "Notes":
      //   return <NoteHome />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="flex flex-grow">
        <div
          className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-[#813D58] text-[#F5EBDE] px-4 py-8 transition-transform duration-300 ease-in-out transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 mt-16 md:mt-0`}
        >
          <Sidebar
            selectedSpan={selectedSpan}
            setSelectedSpan={setSelectedSpan}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
        <div className="flex-grow bg-[#F5EBDE] mt-16 md:mt-0">
          <main className="py-8">
            <div className="container mx-auto">{renderSelectedComponent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;