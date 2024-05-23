"use client";
import React, {useState} from "react";
import { AuthenticatedHeader } from "@/components/auth/AuthenticatedHeader";
import { Topbar } from "@/app/_components/topbar"
import BoardSection from "@/app/boards/BoardSection";


const page = () => {
  const [selectedSpan, setSelectedSpan] = useState("Boards");

  const renderSelectedComponent = () => {
    switch (selectedSpan) {
      case "Boards":
        return <BoardSection />;
      // case "Tasks":
      //   return <TaskHome />;
      // case "Notes":
      //   return <NoteHome />;
      default:
        return null;
    }
  };
  
    return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center px-8 py-4 bg-[#F5EBDE]">
        <AuthenticatedHeader />
      </header>
      <Topbar selectedSpan={selectedSpan} setSelectedSpan={setSelectedSpan} />
      <main className="flex-grow bg-[#F5EBDE] py-8">
        <div className="container mx-auto">{renderSelectedComponent()}</div>
      </main>
    </div>
  );
};

export default page;