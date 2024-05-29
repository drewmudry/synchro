"use client";
import React, { useState } from "react";
import { BoardSection } from "./_components/BoardSection"; 
import Home from "./_components/home";
import { useOrganization } from "@clerk/clerk-react";
import { EmptyOrg } from "./_components/EmptyOrg";
import Navbar from "./_components/navbar";

interface DashboardPageProps {
  searchParams: { search?: string };
}

const Page = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();
  const [selectedSpan, setSelectedSpan] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderSelectedComponent = () => {
    if (!organization) {
      return <EmptyOrg />;
    }
    switch (selectedSpan) {
      case "Boards":
        return <BoardSection orgId={organization.id} query={searchParams} />;
      case "Home":
        return <Home />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-200">
        <Navbar
          selectedSpan={selectedSpan}
          setSelectedSpan={setSelectedSpan}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>
      <div className="flex-1 p-4">{renderSelectedComponent()}</div>
    </div>
  );
};

export default Page;