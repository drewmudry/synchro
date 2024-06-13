"use client"
import { useOrganizationList } from "@clerk/nextjs";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const CustomOrganizationSwitcher = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!isLoaded) {
    return <p>Loading</p>;
  }

  const handleOrganizationSelect = (organizationId: string) => {
    setActive({ organization: organizationId });
  };

  const handleCreateOrganization = () => {
    // Handle creating a new organization
  };

  return (
    <div className="ml-auto flex items-center gap-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="h-full ml-auto rounded-sm text-teal-900"
          >
            <MoreHorizontal className="h-4 w-4 text-teal-900" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[99999] w-60 bg-gray-300"
          align="start"
          side="right"
          forceMount
        >
          {userMemberships.data?.map((mem) => (
            <DropdownMenuItem
              key={mem.id}
              onClick={() => handleOrganizationSelect(mem.organization.id)}
            >
              {mem.organization.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="text-teal-900" />
          <div className="p-2 text-xs">
            <button
              disabled={!userMemberships.hasNextPage}
              onClick={() => userMemberships.fetchNext()}
            >
              Load more organizations
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <div
        role="button"
        onClick={handleCreateOrganization}
        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-gray-300 z-[99999]"
      >
        <Plus className="h-4 w-4 text-teal-900 hover:bg-gray-200" />
      </div>
    </div>
  );
};