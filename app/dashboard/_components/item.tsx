"use client"

import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react"


interface ItemProps {
    id? : Id<"documents">
    documentIcon?: string
    active?: boolean
    expanded?: boolean
    isSearch?: boolean
    level?: number
    onExpand?: ()=> void
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

    const ChevronIcon = expanded ? ChevronDown : ChevronRight

  return (
    <div
    onClick={onClick}
    role="button"
    style={{paddingLeft: level ? `${(level * 12) + 12}px` : '12px'}}
    className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-gray-300 flex items-center text-teal-900 font-helvetica font-medium", 
        active && "bg-gray-300"
        )}
     >
        {!!id && (
            <div
            role="button"
            className="h-full rounded-sm hover:bg-gray-300"
            onClick={()=>{}}
            >
                <ChevronIcon className="h-4 w-4 shrink-0 text-teal-900"/>
            </div>
        )}
        {documentIcon ? (
            <div className="shrink-0 mr-2 text-[18px]">
                {documentIcon}
            </div>
        ) : (
            <Icon className="shrink-0 h-[16px] mr-2 text-teal-900"/>
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
    </div>
  )
}
