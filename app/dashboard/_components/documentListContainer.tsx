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
import { useDocumentContext } from "./documentContext"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TrashBox } from "./trashBox"
import { useMediaQuery } from "usehooks-ts"

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

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [expanded, setExpanded] = useState(true);
  const { documentType, orgId } = useDocumentContext();

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
      {expanded && (
        <Popover>
          <PopoverTrigger className="w-full mt-2">
            <Item label="Trash" icon={Trash} onClick={() => { }} level={level + 1} />
          </PopoverTrigger>
          <PopoverContent className="p-0 w-72" side={isMobile ? "bottom" : "right"}>
            <TrashBox orgId={orgId} />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};