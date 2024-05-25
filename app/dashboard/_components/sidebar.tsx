"use client";
import React from "react";
import { OrganizationSwitcher } from "@clerk/clerk-react";

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
                internal: "null",
              },
            }}
          />
        </div>
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
          <span className="ml-2">Boards</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Tasks' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-[#661437]"}`}
          onClick={() => handleSpanClick("Tasks")}>
          <span className="ml-2">Tasks</span>
        </div>
        <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Notes' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-[#661437]"}`}
          onClick={() => handleSpanClick("Notes")}>
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