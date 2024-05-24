"use client";
import React, { useState } from "react";
import { Sidebar } from "@/app/dashboard/_components/sidebar";
import BoardSection from "@/app/dashboard/_components/BoardSection";
import Home from "./_components/home";
import Topbar from "./_components/topbar";

const Page = () => {
  const [selectedSpan, setSelectedSpan] = useState("Boards");

  const renderSelectedComponent = () => {
    switch (selectedSpan) {
      case "Boards":
        return <BoardSection />;
      case "Home":
        return <Home />;
      // case "Notes":
      // return <NoteHome />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar selectedSpan={selectedSpan} setSelectedSpan={setSelectedSpan} />
      <div className="flex-grow bg-[#F5EBDE]">
        <Topbar />
        <main className="py-8">
          <div className="container mx-auto">{renderSelectedComponent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Page;