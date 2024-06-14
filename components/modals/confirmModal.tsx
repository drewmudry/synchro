"use client"

import {
    AlertDialog, 
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, 
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

interface ConfirmModalProps {
    children: React.ReactNode
    onConfirm: () => void
}

export const ConfirmModal = ({children, onConfirm}: ConfirmModalProps) => {

    const handleConfirm = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation()
        onConfirm()
    }

return (
    <AlertDialog>
        <AlertDialogTrigger onClick={(e) => {e.stopPropagation()}} asChild>
            {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle  className="text-teal-900">
                    Are you sure you wish to contine?
                </AlertDialogTitle>
                <AlertDialogDescription className=" text-teal-900">
                    This action will be perminant. 
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel  className="" onClick={e => e.stopPropagation()}>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction  className="bg-teal-900" onClick={handleConfirm}>
                    Confirm
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
)
}