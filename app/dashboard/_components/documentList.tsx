"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Item } from "./item"
import { cn } from "@/lib/utils"
import { FileIcon, Plus, Trash, UserCircle } from "lucide-react"
import { useOrganization } from "@clerk/clerk-react"
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { TitleItem } from "./titleItem"
import { useDocumentContext } from "./documentContext"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { NavigationItem } from "./NavigationItem"
import { useMediaQuery } from "usehooks-ts"


interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">;
    title?: string;
}

export const DocumentList = ({ parentDocumentId, level = 0, title }: DocumentListProps) => {

    const params = useParams()
    const { organization } = useOrganization();
    const router = useRouter()
    const { documentType, orgId } = useDocumentContext();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const documents = documentType === "user"
        ? useQuery(api.documents.getUserDocuments, {
            parentDocument: parentDocumentId,
        })
        : useQuery(api.documents.getOrgDocuments, {
            orgId: orgId,
            parentDocument: parentDocumentId,
        });

    const [expanded, setExpanded] = useState<Record<string, boolean>>(() => ({
        title: true,
        ...(documents ? Object.fromEntries(documents.map((doc) => [doc._id, false])) : {}),
    }));

    const onExpand = (documentId: string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId],
        }));
    };

    const onTitleExpand = () => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            title: !prevExpanded.title,
        }));
    };

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>
                )}
            </>
        )
    }

    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    return (
        <>
          {/* Wrap the existing JSX elements */}
          <>
            <p
              style={{
                paddingLeft: level ? `${level * 12 + 25}px` : undefined,
              }}
              className={cn(
                "hidden text-sm font-helvetica text-gray-400",
                expanded && "last:block",
                level === 0 && "hidden"
              )}
            >
              No pages inside
            </p>
            {documents.map((document) => (
              <div key={document._id}>
                <Item
                  id={document._id}
                  onClick={() => {
                    onRedirect(document._id);
                  }}
                  label={document.title}
                  icon={FileIcon}
                  documentIcon={document.icon}
                  active={params.documentId === document._id}
                  level={level + 1}
                  onExpand={() => onExpand(document._id)}
                  expanded={expanded[document._id]}
                  authorName={document.authorName}
                />
                {expanded[document._id] && (
                  <DocumentList parentDocumentId={document._id} level={level + 2} />
                )}
              </div>
            ))}
          </>
    
          {/* Add the Popover component */}
          <Popover>
            <PopoverTrigger className="w-full mt-2">
              <Item label="Trash" icon={Trash} onClick={() => {}} level={level} />
            </PopoverTrigger>
            <PopoverContent className="p-0 w-72" side={isMobile ? "bottom" : "right"}>
              <p>Trash compartment</p>
            </PopoverContent>
          </Popover>
        </>
      );
    };
