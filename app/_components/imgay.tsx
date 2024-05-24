"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useOrganizationList } from "@clerk/nextjs";

export function GayOrganizationSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  console.log("userMemberships.data:", userMemberships.data);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? userMemberships.data?.find((mem) => mem.organization.id === value)
                ?.organization.name
            : "Select organization..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search organization..." />
          <CommandEmpty>No organization found.</CommandEmpty>
          <CommandGroup>
            {userMemberships.data && userMemberships.data.map((mem) => (
              <CommandItem
                key={mem.organization.id}
                value={mem.organization.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  setActive({ organization: currentValue });
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === mem.organization.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {mem.organization.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
        <Button
          disabled={!userMemberships.hasNextPage}
          onClick={() => userMemberships.fetchNext()}
        >
          Load more organizations
        </Button>
      </PopoverContent>
    </Popover>
  );
}