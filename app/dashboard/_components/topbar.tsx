"use client";
import React from "react";
import { NewButton } from "./new-button";

export const Topbar = () => {
    return (
      <div className="flex justify-start items-center px-8 py-4 bg-[#813D58]">
        <NewButton />
      </div>
    );
  };

export default Topbar;