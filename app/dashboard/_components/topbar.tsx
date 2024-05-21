"use client";
import React from "react";
import { NewButton } from "./new-button";
import { OrganizationList } from "./organization-selector";



export const Topbar = () => {
    return (
      <div className="flex justify-start items-center px-8 py-4 bg-[#813D58]">
        <NewButton />
        <OrganizationList />
      </div>
    );
  };

export default Topbar;