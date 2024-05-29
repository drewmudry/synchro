"use client";
import React from "react";
import { OrganizationSwitcher } from "@clerk/clerk-react";
import Image from "next/image";


type SidebarProps = {
  selectedSpan: string;
  setSelectedSpan: (spanName: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  selectedSpan,
  setSelectedSpan,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {

  const handleSpanClick = (spanName: string) => {
    setSelectedSpan(spanName);
  };

  return (
    <div className="flex flex-col bg-[#813D58] p-4 h-screen w-48">
      <div className="flex-1">
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Home' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-[#661437]"}`}
          onClick={() => handleSpanClick("Home")}>
          <span className="ml-2">Home</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Boards' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-[#661437]"}`}
          onClick={() => handleSpanClick("Boards")}>
            <Image
            src="/boards.svg"
            alt="Boards logo"
            width={20}
            height={20}
            className={`mr-4 ${selectedSpan === "Boards" ? "fill-black" : "fill-white"}`}
          />
          <span className="ml-2">Boards</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Tasks' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-[#661437]"}`}
          onClick={() => handleSpanClick("Tasks")}>
            <Image
            src="/tasks.svg"
            alt="tasks logo"
            width={30}
            height={30}
            className={`mr-4 ${selectedSpan === "Tasks" ? "fill-black" : "fill-white"}`}
          />
          <span className="ml-2">Tasks</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Notes' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-[#661437]"}`}
          onClick={() => handleSpanClick("Notes")}>
            <Image
            src="/notes.svg"
            alt="notes logo"
            width={20}
            height={20}
            className={`mr-4 ${selectedSpan === "Notes" ? "fill-black" : "fill-white"}`}
          />
          <span className="ml-2">Notes</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Analytics' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-[#661437]"}`}
          onClick={() => handleSpanClick("Analytics")}>
          <span className="ml-2">Analytics</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;