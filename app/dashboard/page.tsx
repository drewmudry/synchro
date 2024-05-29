"use client";
import React, { useState } from "react";
import { BoardSection } from "./_components/BoardSection";
import { useOrganization } from "@clerk/clerk-react";
import { EmptyOrg } from "./_components/EmptyOrg";
import Navbar from "./_components/navbar";
import { TaskSection } from "./_components/TaskSection";
import { NoteSection } from "./_components/NoteSection";
import HomeSection from "./_components/HomeSection";

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
      case "Home":
        return <HomeSection />;
      case "Boards":
        return <BoardSection orgId={organization.id} query={searchParams} />;
      case "Tasks":
        return <TaskSection orgId={organization.id} query={searchParams}/>;
      case "Notes":
        return <NoteSection orgId={organization.id} query={searchParams}/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-50">
        <Navbar
          selectedSpan={selectedSpan}
          setSelectedSpan={setSelectedSpan}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>
      <div className="flex-1 p-4 bg-grey-200">{renderSelectedComponent()}</div>
    </div>
  );
};

export default Page;