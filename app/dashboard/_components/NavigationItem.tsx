import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavigationItemProps {
  label: string;
  onClick: () => void;
  icon: LucideIcon;
  isSearch?: boolean;
}

export const NavigationItem = ({
  label,
  onClick,
  icon: Icon,
  isSearch,
}: NavigationItemProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-gray-300 flex items-center text-teal-900 font-helvetica font-medium"
      )}
    >
      <Icon className="shrink-0 h-[16px] mr-2 text-teal-900" />

      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd
          className="ml-auto pointer-events-none inline-flex h-5 select-none
          items-center gap-1 rounded boarder bg-gray-100 px-1.5 font-mono text-[10px] font-medium 
          text-teal-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="text-s font-bold">⌘</span>k
        </kbd>
      )}
    </div>
  );
};

NavigationItem.Skeleton = function NavigationItemSkeleton() {
  return (
    <div className="flex gap-x-2 py-[3px]">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};