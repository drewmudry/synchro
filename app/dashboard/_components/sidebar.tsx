"use client";
import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { OrganizationSwitcher } from "@clerk/clerk-react";
import Image from "next/image";

type SidebarProps = {
  selectedSpan: string;
  setSelectedSpan: (spanName: string) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ selectedSpan, setSelectedSpan }) => {
  const handleSpanClick = (spanName: string) => {
    setSelectedSpan(spanName);
  };

  return (
    <div className="flex flex-col bg-[#813D58] p-4 h-screen w-48">
      <div className="flex items-center ">
        <Image src="/lotus-flower.svg" alt="Logo" width={32} height={32} />
        <span className="text-[#F5EBDE] font-bold text-lg ml-2">Synchro</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2">
          <OrganizationSwitcher
            hidePersonal={true}
            appearance={{
              elements: {
                organizationSwitcherTrigger: "text-[#F5EBDE] text-xl px-4 py-2",
                organizationSwitcherDropdown: "bg-[#813D58] text-[#F5EBDE]",
                organizationSwitcherDropdownItemContainer: "hover:bg-[#661437]",
                organizationSwitcherDropdownItem: "text-[#F5EBDE]",
                organizationPreviewMainIdentifier: "text-lg", 
                button: "hover:bg-rose-100", 
                organizationPreviewAvatarContainer: "p-1", 
                rootBox: "rounded-sm", 
                internal: "null"
              },
            }}
          />
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 ${selectedSpan === "Home"
            ? "text-[#661437] bg-[#F5EBDE]"
            : "hover:bg-[#661437]"
            }`}
          onClick={() => handleSpanClick("Home")}
        >
          <span className="ml-2">Home</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 ${selectedSpan === "Boards"
            ? "text-[#661437] bg-[#F5EBDE]"
            : "hover:bg-[#661437]"
            }`}
          onClick={() => handleSpanClick("Boards")}
        >
          <span className="ml-2">Boards</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 ${selectedSpan === "Tasks"
            ? "text-[#661437] bg-[#F5EBDE]"
            : "hover:bg-[#661437]"
            }`}
          onClick={() => handleSpanClick("Tasks")}
        >
          <span className="ml-2">Tasks</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 ${selectedSpan === "Notes"
            ? "text-[#661437] bg-[#F5EBDE]"
            : "hover:bg-[#661437]"
            }`}
          onClick={() => handleSpanClick("Notes")}
        >
          <span className="ml-2">Notes</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 ${selectedSpan === "Analytics"
            ? "text-[#661437] bg-[#F5EBDE]"
            : "hover:bg-[#661437]"
            }`}
          onClick={() => handleSpanClick("Analytics")}
        >
          <span className="ml-2">Analytics</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;