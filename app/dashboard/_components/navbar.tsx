"use client";
import React from "react";
import { OrganizationSwitcher, UserButton, useUser } from "@clerk/clerk-react";
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

    const { user } = useUser();

    return (
        <div className="flex flex-col bg-zinc-800 text-white p-4 h-screen w-56">
            <div className="mb-4 flex">
                <Image
                    src="/lotus-teal-500.svg"
                    alt="Synchro logo"
                    width={36}
                    height={36}
                />
                <span className="text-teal-500 justify-center font-helvetica text-2xl font-bold mt-auto ml-8">
                    Synchro
                </span>

            </div>
            <div className="mb-4">
                <OrganizationSwitcher
                    hidePersonal={true}
                    appearance={{
                        elements: {
                            organizationSwitcherTrigger: "flex items-center text-gray-200 text-sm px-4 py-2 rounded-md",
                            organizationSwitcherDropdown: "bg-red-500 text-gray-200",
                            organizationSwitcherDropdownItemContainer: "hover:text-gray-200",
                            organizationSwitcherDropdownItem: "text-gray-200",
                            organizationPreviewMainIdentifier: "text-sm",
                            button: "hover:bg-teal-900",
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

                {/* Home button on navbar */}
                {/* <div
                    className={`flex items-center text-gray-200 cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Home' ? "bg-teal-900 text-gray-200" : "hover:bg-teal-800"}`}
                    onClick={() => handleSpanClick("Home")}>
                    <Image
                        src="/boards.svg"
                        alt="Boards logo"
                        width={20}
                        height={20}
                        className={`mr-4 ${selectedSpan === "Home" ? "fill-slate-300" : "fill-red-500"}`}
                    />
                    <span className="ml-2">Home</span>
                </div> */}

                {/* Boards button on navbar */}
                {/* <div
                    className={`flex items-center text-gray-200 cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Boards' ? "bg-teal-900 text-gray-200" : "hover:bg-teal-800"}`}
                    onClick={() => handleSpanClick("Boards")}>
                    <Image
                        src="/boards.svg"
                        alt="Boards logo"
                        width={20}
                        height={20}
                        className={`mr-4 ${selectedSpan === "Boards" ? "fill-slate-300" : "fill-red-500"}`}
                    />
                    <span className="ml-2">Boards</span>
                </div> */}

                {/* Tasks button on navbar */}
                {/* <div
                    className={`flex items-center text-gray-200 cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Tasks' ? "bg-teal-900 text-gray-200" : "hover:bg-teal-800"}`}
                    onClick={() => handleSpanClick("Tasks")}>
                    <Image
                        src="/boards.svg"
                        alt="Boards logo"
                        width={20}
                        height={20}
                        className={`mr-4 ${selectedSpan === "Tasks" ? "fill-slate-300" : "fill-red-500"}`}
                    />
                    <span className="ml-2">Tasks</span>
                </div> */}

                {/* Notes button on navbar */}
                <div
                    className={`flex items-center text-gray-200 cursor-pointer px-2 py-3 rounded mb-2 
          ${selectedSpan === 'Notes' ? "bg-teal-900 text-gray-200" : "hover:bg-teal-800"}`}
                    onClick={() => handleSpanClick("Notes")}>
                    <Image
                        src="/boards.svg"
                        alt="Boards logo"
                        width={20}
                        height={20}
                        className={`mr-4 ${selectedSpan === "Notes" ? "fill-slate-300" : "fill-red-500"}`}
                    />
                    <span className="ml-2">Notes</span>
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
            <div className="mt-auto flex">
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

                <div className="flex flex-col justify-center ml-2">
                    <span className="text-gray-200 text-sm leading-none truncate max-w-[150px] mb-1"> {user?.fullName} </span>
                    <span className="text-gray-200 text-xs leading-none mt-1 truncate max-w-[150px] text-center"> {user?.primaryEmailAddress?.emailAddress} </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;