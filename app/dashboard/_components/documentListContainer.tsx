"use client"
import { Item } from "./item"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { UserCircle, LucideIcon, Trash } from "lucide-react"
import { useState } from "react"
import { DocumentList } from "./documentList"
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useOrganization } from "@clerk/clerk-react"
import { TitleItem } from "./titleItem"
import { useMediaQuery } from "usehooks-ts"
import { useDocumentContext } from "./documentContext"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Title } from "@radix-ui/react-dialog"
import { NavigationItem } from "./NavigationItem"

interface DocumentListContainerProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">;
  title?: string;
  titleIcon: LucideIcon;
}

export const DocumentListContainer = ({
  parentDocumentId,
  level = 0,
  title,
  titleIcon
}: DocumentListContainerProps) => {
  const [expanded, setExpanded] = useState(true);
  const { documentType, orgId } = useDocumentContext();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const onTitleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
      <TitleItem
        onClick={() => { }}
        label={title!}
        icon={titleIcon}
        level={level}
        isSearch={false}
        expanded={expanded}
        onExpand={onTitleExpand}
      />
      {expanded && (
        <DocumentList
          parentDocumentId={parentDocumentId}
          level={level + 1}
        />
      )}
    </>
  );
};