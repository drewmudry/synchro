"use client"

import { LucideIcon } from "lucide-react"


interface ItemProps {
    label: string
    onClick: () => void
    icon: LucideIcon
}

export const Item = ({
    label, 
    onClick, 
    icon: Icon
}: ItemProps) => {
  return (
    <div
    onClick={onClick}
    role="button"
    style={{paddingLeft: '12px'}}
    className="group min-h-[27px] text-sm py-1 pr-3 w-full
     hover:bg-gray-300 flex items-center text-teal-900 font-helvetica font-medium"
     >
        <Icon className="shrink-0 h-[16px] mr-2 text-teal-900"/>
        <span className="truncate">
            {label}
        </span>
    </div>
  )
}
