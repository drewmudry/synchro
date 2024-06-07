"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useOrganization } from "@clerk/clerk-react"
import { createUserDocument } from "@/convex/documents"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


interface ItemProps {
    id?: Id<"documents">
    documentIcon?: string
    active?: boolean
    expanded?: boolean
    isSearch?: boolean
    level?: number
    onExpand?: () => void
    label: string
    onClick: () => void
    icon: LucideIcon
}

export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    expanded,
    onExpand

}: ItemProps) => {
    const router = useRouter()

    const createOrgDocument = useMutation(api.documents.createOrgDocument)
    const createUserDocument = useMutation(api.documents.createUserDocument)
    const { organization } = useOrganization()

    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
        onExpand?.()
    }

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!id) return
        if (!organization) {
            const promise = createUserDocument({ title: "untitled", parentDocument: id })
                .then((documentId) => {
                    if (!expanded) {
                        onExpand?.()
                    }
                    router.push(`/documents/${documentId}`)
                })

            toast.promise(promise, {
                loading: "Creating a new document...",
                success: "New document created!",
                error: "Failed to create a new document."
            })
        } else {
            const promise = createOrgDocument({ title: "untitled", parentDocument: id, orgId: organization.id })
                .then((documentId) => {
                    if (!expanded) {
                        onExpand?.()
                    }
                    router.push(`/documents/${documentId}`)
                })

            toast.promise(promise, {
                loading: "Creating a new document...",
                success: "New document created!",
                error: "Failed to create a new document."
            })
        }
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight

    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${(level * 12) + 12}px` : '12px' }}
            className={cn(
                "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-gray-300 flex items-center text-teal-900 font-helvetica font-medium",
                active && "bg-gray-300"
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-gray-300"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-teal-900" />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (
                <Icon className="shrink-0 h-[16px] mr-2 text-teal-900" />
            )}

            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd
                    className="ml-auto pointer-events-none inline-flex h-5 select-none
            items-center gap-1 rounded boarder bg-gray-100 px-1.5 font-mono text-[10px] font-medium 
            text-teal-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                    <span className="text-s font-bold">⌘</span>k
                </kbd>
            )}
            {!!id && (
                <div 
                role="button"
                onClick={onCreate}
                className="ml-auto flex items-center gap-x-2">
                    <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-gray-300">
                        <Plus className="h-4 w-4 text-teal-900 hover:bg-gray-200" />
                    </div>
                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : '25px'
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />
        </div>
    )
}