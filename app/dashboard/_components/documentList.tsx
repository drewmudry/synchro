"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Item } from "./item"
import { cn } from "@/lib/utils"
import { FileIcon } from "lucide-react"
import { useOrganization } from "@clerk/clerk-react"

interface DocumentListProps{
    parentDocumentId?: Id<"documents">
    level?: number
    data?: Doc<"documents">
}

export const DocumentList = ({parentDocumentId, level=0 }: DocumentListProps ) => {

    const params = useParams()
    const { organization } = useOrganization();
    const router = useRouter()
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded, 
            [documentId]: !prevExpanded[documentId]
        }))
    }

    const documents = !organization
        ? useQuery(api.documents.getUserDocuments, {
            parentDocument: parentDocumentId
        })
        : useQuery(api.documents.getOrgDocuments, {
            orgId: organization.id,
            parentDocument: parentDocumentId
        });

    if(documents === undefined){
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
        <p style={{
            paddingLeft: level? `${(level * 12) + 25}px`: undefined
        }}
        className={cn(
            "hidden text-sm font-helvetica text-gray-400", 
            expanded && "last:block", 
            level === 0 && "hidden"
        )}
        >
            No pages inside
        </p>
        {
            documents.map((document) => (
                <div key={document._id}>
                    <Item 
                    id={document._id}
                    onClick={()=>onRedirect(document._id)}
                    label={document.title}
                    icon={FileIcon}
                    documentIcon={document.icon}
                    active={params.documentId === document._id}
                    level={level}
                    onExpand={()=> onExpand(document._id)}
                    expanded={expanded[document._id]}
                    authorName={document.authorName}
                    />
                    {expanded[document._id] && (
                        <DocumentList 
                        parentDocumentId={document._id}
                        level={level + 1}
                        />
                    )}
                </div>
            ))
        }
    </>
  )
}
