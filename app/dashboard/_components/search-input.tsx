"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";

export const SearchInput = ({ defaultValue = "Search" }) => {
  const router = useRouter();
  const [debouncedValue, setValue] = useDebounceValue(defaultValue, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const trimmedValue = debouncedValue.trim();

    if (trimmedValue !== defaultValue) {
      const url = qs.stringifyUrl(
        {
          url: "/dashboard",
          query: trimmedValue ? { search: trimmedValue } : {},
        },
        { skipEmptyString: true, skipNull: true }
      );

      router.push(url);
    }
  }, [debouncedValue, defaultValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[512px] pl-9"
        placeholder="Search..."
        onChange={handleChange}
      />
    </div>
  );
};