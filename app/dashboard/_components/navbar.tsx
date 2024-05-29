"use client";
import React from "react";
import { OrganizationSwitcher, UserProfile, UserButton } from "@clerk/clerk-react";
import Image from "next/image";
import Link from 'next/link';
import { SearchInput } from "@/app/dashboard/_components/search-input";


type NavbarProps = {
  selectedSpan: string;
  setSelectedSpan: (spanName: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
};

export const Navbar: React.FC<NavbarProps> = ({
  selectedSpan,
  setSelectedSpan,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {

  const handleSpanClick = (spanName: string) => {
    setSelectedSpan(spanName);
  };

  return (
    <div className="flex flex-col bg-[#1E1F21] text-white p-4 h-screen w-64">
      <div className="mb-4">
        <OrganizationSwitcher
          hidePersonal={true}
          appearance={{
            elements: {
              organizationSwitcherTrigger: "flex items-center text-white text-sm px-4 py-2 rounded-md hover:bg-[#333436]",
              organizationSwitcherDropdown: "bg-[#1E1F21] text-white",
              organizationSwitcherDropdownItemContainer: "hover:bg-[#333436]",
              organizationSwitcherDropdownItem: "text-white",
              organizationPreviewMainIdentifier: "text-sm",
              button: "hover:bg-[#333436]",
              organizationPreviewAvatarContainer: "p-1",
              rootBox: "rounded-md",
              internal: "null",
            },
          }}
        />
      </div>
      <div className="mb-4 text-teal-900">
        <SearchInput />
      </div>
      <div className="flex-1">

        {/* Boards button on navbar */}
      <div
          className={`flex items-center text-[#F5EBDE] cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Home' ? "bg-[#F5EBDE] text-pink-900" : "hover:bg-teal-900"}`}
          onClick={() => handleSpanClick("Home")}>
            <Image
            src="/boards.svg"
            alt="Boards logo"
            width={20}
            height={20}
            className={`mr-4 ${selectedSpan === "Home" ? "fill-slate-300" : "fill-green"}`}
          />
          <span className="ml-2">Home</span>
        </div>

        {/* Boards button on navbar */}
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
        
      </div>

      <div>
        <Link
          href="/settings"
          className="flex items-center text-white cursor-pointer px-4 py-2 rounded mb-2 hover:bg-[#333436]"
        >
          <span className="ml-2">Settings</span>
        </Link>
      </div>
      <div className="mt-auto">
        <UserButton
          appearance={{
            elements: {
              rootBox: "flex items-center p-4 rounded-md hover:bg-[#333436]",
              userProfile: "text-white",
              userProfileMainIdentifier: "text-sm",
              userProfileAvatarContainer: "mr-2",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;