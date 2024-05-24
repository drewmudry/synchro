import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { GayOrganizationSwitcher } from "@/app/_components/imgay";

const Topbar = () => {
  return (
    <header className="flex items-center justify-between bg-[#813D58] px-4 py-2">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="rounded-md px-4 py-2 text-[#813D58] focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <GayOrganizationSwitcher />
      </div>
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  );
};

export default Topbar;