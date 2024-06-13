"use client"

import { cn } from "@/lib/utils"
import { OrganizationSwitcher, useOrganization } from "@clerk/clerk-react"
import { ChevronsLeft, MenuIcon, Search, Settings, Building2, User } from "lucide-react"
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { UserButton, useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DocumentListContainer } from "./documentListContainer";
import { DocumentProvider } from "./documentContext";
import { NavigationItem } from "./NavigationItem";

export const Navigation = () => {
    const pathName = usePathname()
    const isMobile = useMediaQuery("(max-width: 768px)")

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)
    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)

    const { user } = useUser();
    const router = useRouter()
    const createOrgDocument = useMutation(api.documents.createOrgDocument)
    const createUserDocument = useMutation(api.documents.createUserDocument)
    const { organization } = useOrganization()

    useEffect(() => {
        if (isMobile) {
            collapse
        } else {
            resetWidth
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse
        }
    }, [pathName, isMobile])

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;
        if (newWidth < 150 && newWidth > 50) newWidth = 150;
        if (newWidth > 360) newWidth = 360;

        if (sidebarRef.current && navbarRef.current) {
            if (newWidth < 50) {
                collapse();
            } else {
                sidebarRef.current.style.width = `${newWidth}px`;
                navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
            }
        }
    };

    const [isDocumentsCollapsed, setIsDocumentsCollapsed] = useState(false);
    const toggleDocumentsCollapse = () => {
        setIsDocumentsCollapsed(!isDocumentsCollapsed);
    };

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)

            sidebarRef.current.style.width = isMobile ? '100%' : '240px'
            navbarRef.current.style.setProperty("width", isMobile ? "O" : "calc(100% - 240px)");
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true)
            setIsResetting(true)

            sidebarRef.current.style.width = '0'
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar h-full bg-gray-200 overflow-y-auto relative flex w-60 flex-col z-[99998]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >
                <div
                    onClick={collapse}
                    role="button"
                    className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-gray-300 absolute top-1 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft />
                </div>
                <div className="flex justify-left w-full pl-2">
                    <span className="text-teal-900 justify-center font-helvetica text-xl font-bold pr-2">
                        Synchro
                    </span>
                    <Image
                        src="/lotus-teal-900.svg"
                        alt="Synchro logo"
                        width={20}
                        height={20}
                    />

                </div>
                <div className="relative">
                    <OrganizationSwitcher
                        hidePersonal={true}
                        appearance={{
                            elements: {
                                organizationSwitcherTrigger: "flex items-center text-teal-900 text-md rounded-md width-100%",
                                organizationSwitcherDropdown: "bg-red-500 text-gray-200 right-0",
                                organizationSwitcherPopoverCard: "z-[99999]",
                                organizationSwitcherDropdownItem: "text-red-500",
                                organizationPreviewMainIdentifier: "text-lg",
                                organizationPreview: "text-bold",
                                button: "hover:bg-teal-900",
                                organizationPreviewAvatarContainer: "pl-2",
                                rootBox: "rounded-md z-[99999]",
                                modalBackdrop: "z-[99999]",
                                modalContent: "z-[99999]",
                                cardBox: "z-[99999]",
                                createOrganization: "z-[99999]",
                                card: "z-[99999]",

                            },
                        }}
                    />
                    <NavigationItem
                        label="Search"
                        icon={Search}
                        isSearch
                        onClick={() => { }}
                    />
                    <NavigationItem
                        label="Settings"
                        icon={Settings}
                        onClick={() => { }}
                    />
                </div>
                <div className="mt-4">
                    <DocumentProvider documentType="user" orgId="">
                        <DocumentListContainer
                            titleIcon={User}
                            title="Your Documents"
                        />
                    </DocumentProvider>
                </div>
                {organization && (
                    <div className="mt-4">
                        <DocumentProvider documentType="org" orgId={organization.id}>
                            <DocumentListContainer
                                titleIcon={Building2}
                                title={organization.name + "'s Documents"}
                            />
                        </DocumentProvider>
                    </div>
                )}
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize
            absolute h-full w-1 right-0 top-0 bg-teal-500"
                />

                <div className="mt-auto flex items-center p-2 pb-8">
                    <UserButton
                        appearance={{
                            elements: {
                                rootBox: "flex items-center rounded-md hover:bg-[#333436]",
                                userProfile: "text-teal-900",
                                userProfileMainIdentifier: "text-sm",
                                userProfileAvatarContainer: "mr-2",
                                userButtonPopoverCard: "z-[99999]"
                            },
                        }}
                    />

                    <div className="flex flex-col justify-center ml-2">
                        <span className="text-teal-900 text-sm leading-none truncate max-w-[150px]">
                            {user?.fullName}
                        </span>
                        <span className="text-teal-900 text-xs leading-none mt-1 truncate max-w-[150px] text-center">
                            {user?.primaryEmailAddress?.emailAddress}
                        </span>
                    </div>
                </div>
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute top-0 z-[99998] left-60 w-[calc(100%-240px)]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "left-0 w-full"
                )}>
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon role={"button"} onClick={resetWidth} className="h-6 w-6 text-red-600" />}
                </nav>
            </div>
        </>
    )
}