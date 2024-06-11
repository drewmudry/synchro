"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Item } from "./item"
import { cn } from "@/lib/utils"
import { FileIcon, Plus, UserCircle } from "lucide-react"
import { useOrganization } from "@clerk/clerk-react"
import { useMutation } from "convex/react";
import { toast } from "sonner";


interface DocumentListProps {
    parentDocumentId?: Id<"documents">
    level?: number
    data?: Doc<"documents">
    title?: string
    query: "user" | "org"
    orgId?: string
}

export const DocumentList = ({ parentDocumentId, level = 0, title, query, orgId = "" }: DocumentListProps) => {

    const params = useParams()
    const { organization } = useOrganization();
    const router = useRouter()
    const createUserDocument = useMutation(api.documents.createUserDocument)

    const handleCreate = () => {
        const promise = createUserDocument({ title: "untitled" })
            .then((documentId) => {
                // router.push(`/documents/${documentId}`)
            })

        toast.promise(promise, {
            loading: "Creating a new document...",
            success: "New document created!",
            error: "Failed to create a new document."
        })

    }


    const documents = (query === "user")
        ? useQuery(api.documents.getUserDocuments, {
            parentDocument: parentDocumentId
        })
        : useQuery(api.documents.getOrgDocuments, {
            orgId: orgId,
            parentDocument: parentDocumentId
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
            {title && (
                <Item
                    onClick={onTitleExpand}
                    label={title}
                    icon={UserCircle}
                    level={level}
                    isSearch={false}
                    expanded={expanded.title}
                    onExpand={onTitleExpand}
                    isTitle={true}
                />
            )}
            {expanded.title && (
                <>
                    <p style={{
                        paddingLeft: level ? `${(level * 12) + 25}px` : undefined
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
                                onClick={() => onRedirect(document._id)}
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
                                <DocumentList
                                    parentDocumentId={document._id}
                                    level={level + 2}
                                    query="org"
                                />
                            )}
                        </div>
                    ))}

                </>
            )}
            {/* <Item
                onClick={handleCreate}
                icon={Plus}
                label="Add a page"
                level={level}
            /> */}
        </>
    )
}