import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { SearchInput } from "@/app/dashboard/_components/search-input";
import Image from "next/image";

interface TopbarProps {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

const Topbar = ({ onMenuClick, isMobileMenuOpen }: TopbarProps) => {
  return (
    <header className="flex items-center justify-between bg-[#813D58] px-4 py-2">
      <div className="flex items-center">
        <Image src="/lotus-flower.svg" alt="Logo" width={32} height={32} />
        <span className="text-[#F5EBDE] font-bold text-lg ml-2">Synchro</span>
      </div>
      <div className="md:hidden">
        {/* Mobile menu button */}
        <button
          className="p-2 bg-[#F5EBDE] text-[#813D58] rounded-md focus:outline-none"
          onClick={onMenuClick}
        >
          {isMobileMenuOpen ? (
            // Render the "X" icon when the menu is open
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Render the hamburger icon when the menu is closed
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex items-center">
        <SearchInput />
      </div>
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  );
};

export default Topbar;