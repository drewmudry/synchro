"use client";
import React, { useState } from "react";
import { BoardSection } from "./_components/BoardSection";
import { useOrganization } from "@clerk/clerk-react";
import { EmptyOrg } from "./_components/EmptyOrg";
import Navbar from "./_components/navbar";
import { TaskSection } from "./_components/TaskSection";
import { NoteSection } from "./_components/NoteSection";
import HomeSection from "./_components/HomeSection";
import { Navigation } from "./_components/navigation";

interface DashboardPageProps {
  searchParams: { search?: string };
}

const Page = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();
  const [selectedSpan, setSelectedSpan] = useState("Notes");
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
      <div>
        <Navigation />
      </div>
      <div className="flex-1 bg-grey-200 flex items-center justify-center">
        {renderSelectedComponent()}
      </div>
    </div>
  );
};

export default Page;