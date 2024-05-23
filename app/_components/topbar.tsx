"use client";
import { UserButton } from "@clerk/clerk-react";
import React, { useState } from "react";
import { OrganizationSwitcher } from "@clerk/clerk-react";

export const Topbar = ({ selectedSpan, setSelectedSpan }) => {
  const handleSpanClick = (spanName) => {
    setSelectedSpan(spanName);
  };

  return (
    <div className="flex items-center bg-[#813D58] px-4 py-2">
      <div className="w-1/8 flex justify-start">
        <OrganizationSwitcher
          hidePersonal={true}
          appearance={{
            elements: {
              organizationSwitcherTrigger: "text-[#F5EBDE]",
            },
          }}
        />
      </div>
      <div className="w-1/6"></div>
      <div className="w-1/2 flex justify-center">
        <span
          className={`text-[#F5EBDE] cursor-pointer px-2 py-1 rounded ${selectedSpan === "Home" ? "text-[#661437] bg-[#F5EBDE] " : ""
            }`}onClick={() => handleSpanClick("Home")}>
          Home
        </span>
      </div>

      <div className="w-1/2 flex justify-start">
        <span
          className={`text-[#F5EBDE] cursor-pointer px-2 py-1 rounded ${selectedSpan === "Boards" ? "text-[#661437] bg-[#F5EBDE] " : ""
            }`}onClick={() => handleSpanClick("Boards")}>
          Boards
        </span>
      </div>

      <div className="w-1/2 flex justify-center">
        <span
          className={`text-[#F5EBDE] cursor-pointer px-2 py-1 rounded ${selectedSpan === "Tasks" ? "text-[#661437] bg-[#F5EBDE] " : ""
            }`}onClick={() => handleSpanClick("Tasks")}>
          Tasks
        </span>
      </div>

      <div className="w-1/2 flex justify-start">
        <span
          className={`text-[#F5EBDE] cursor-pointer px-2 py-1 rounded ${selectedSpan === "Notes" ? "text-[#661437] bg-[#F5EBDE] " : ""
            }`}onClick={() => handleSpanClick("Notes")}>
          Notes
        </span>
      </div>
      <div className="w-1/6 flex justify-end">
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;