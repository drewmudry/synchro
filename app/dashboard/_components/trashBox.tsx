"use client"

import { ConfirmModal } from "@/components/modals/confirmModal"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react"
import { Search, Trash, Undo } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface TrashBoxProps {
    orgId: string;
    documentType: "user" | "org";
}

export const TrashBox = ({ orgId, documentType }: TrashBoxProps) => {
    const router = useRouter()
    const params = useParams()

    const documents = documentType === "user"
        ? useQuery(api.documents.getUserTrashDocument)
        : useQuery(api.documents.getOrgTrashDocument, { orgId: orgId })

    const restore = documentType === "user"
        ? useMutation(api.documents.userRestoreDocument)
        : useMutation(api.documents.orgRestoreDocument)

    const remove = documentType === "user"
        ? useMutation(api.documents.userRemoveDocument)
        : useMutation(api.documents.orgRemoveDocument)

    const [search, setSearch] = useState("")


    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase())
    })

    const onClick = (documentId: string) => {
        // router.push(`/documents/${documentId}`)
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
        doc_orgId: string | undefined
    ) => {
        event?.stopPropagation()
        const promise = documentType === "user"
            ? restore({ orgId: "", id: documentId })
            : restore({ orgId: doc_orgId ?? "", id: documentId })
        toast.promise(promise, {
            loading: "Restoring Document...",
            success: "Document Restored!",
            error: "Could not restore document"
        })
    }

    const onRemove = (
        documentId: Id<"documents">,
        doc_orgId: string | undefined
    ) => {
        const promise = documentType === "user"
            ? remove({ orgId: "", id: documentId })
            : remove({ orgId: doc_orgId ?? "", id: documentId });

        toast.promise(promise, {
            loading: "Deleting Document...",
            success: "Document deleted!",
            error: "Could not delete document"
        });

        if (params.document === documentId) {
            // router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center">
                Loading...
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-5 w-5 font-bold text-teal-900" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible:ring-transparent bg-gray-200"
                    placeholder="Filter Trash"
                />
            </div>
            <div className="mt-2 pl-2 pr-1 pb-1">
                <p className="hidden last:block text-xs text-center text-teal-900 pb-2">
                    No documents found
                </p>
                {filteredDocuments?.map((document) => (
                    <div
                        key={document._id}
                        role="button"
                        onClick={() => onClick(document._id)}
                        className="text-sm text-teal-900 rounded-sm w-full
                    flex items-center justify-between"
                    >
                        <span className="truncate pl-2 ">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                            <div
                                onClick={(e) => onRestore(e, document._id, document.orgId)}
                                role="button"
                                className="rounded-sm p-1 hover:bg-gray-200"
                            >
                                <Undo className="h-4 w-4 text-teal-900" />
                            </div>
                            <ConfirmModal onConfirm={() => onRemove(document._id, document.orgId)}>
                                <div
                                    role="button"
                                    className="rounded-sm p-1 hover:bg-gray-200"
                                >
                                    <Trash className="h-4 w-4 text-teal-900" />
                                </div>
                            </ConfirmModal>
                        </div>
                    </div>
                )
                )}

            </div>
        </div>
    )
}