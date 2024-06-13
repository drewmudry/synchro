"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useOrganization, useUser } from "@clerk/clerk-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuTrigger,
         DropdownMenuItem, DropdownMenuSeparator, 
         DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { useDocumentContext } from "./documentContext"


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
    authorName?: string
    isTitle?: boolean
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
    onExpand,
    authorName,
    isTitle = false,
}: ItemProps) => {
    const router = useRouter();
    const { user } = useUser()
    const { organization } = useOrganization();
    const createOrgDocument = useMutation(api.documents.createOrgDocument);
    const createUserDocument = useMutation(api.documents.createUserDocument);
    const userArchive = useMutation(api.documents.userArchive)
    const orgArchive = useMutation(api.documents.orgArchive)
    const { documentType, orgId } = useDocumentContext();

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation()
        if (!id) return

        if (documentType === 'user') {
            const promise = userArchive({ id })
            toast.promise(promise, {
                loading: "Moving to trash...",
                success: "Document moved to trash!",
                error: "Failed to archive document.",
            });
        } else if (documentType === 'org') {
            const promise = orgArchive({ id, orgId: orgId })
            toast.promise(promise, {
                loading: "Moving to trash...",
                success: "Document moved to trash!",
                error: "Failed to archive document.",
            });
        }
    }

    const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (documentType === 'user') {
            const promise = createUserDocument({ title: "untitled", parentDocument: id}).then(
                (documentId) => {
                    // onClick();
            });

            toast.promise(promise, {
                loading: "Creating a new document...",
                success: "New document created!",
                error: "Failed to create a new document.",
            });
        } else if (documentType === 'org') {
            if (organization) {
                const promise = createOrgDocument({ title: "untitled", orgId: orgId, parentDocument: id }).then(
                    (documentId) => {
                        // onClick();
                    }
                );

                toast.promise(promise, {
                    loading: "Creating a new document...",
                    success: "New document created!",
                    error: "Failed to create a new document.",
                });
            } else {
                toast.error("Organization not found. Please try again later.");
            }
        }
    };

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        onExpand?.();
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

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
            {(!!id || isTitle) && (
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
                    onClick={() => { }}
                    className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            asChild>
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm
                            hover:bg-gray-200"
                            >
                                <MoreHorizontal className="h-4 w-4 text-teal-900" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="z-[99999] w-60 bg-gray-300"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="text-teal-900" />
                            <div className="p-2 text-xs">
                                Created by: {authorName}
                            </div>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-gray-300 z-[99999]"
                    >
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