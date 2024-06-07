"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/clerk-react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface NoteSectionProps {
  orgId: string,
  query: {
    search?: string,

  }
}

export const NoteSection = ({ orgId, query }: NoteSectionProps) => {

  const data = [] //placeholder for api call data 
  const router = useRouter()
  const createOrgDocument = useMutation(api.documents.createOrgDocument)
  const createUserDocument = useMutation(api.documents.createUserDocument)
  const { organization } = useOrganization()

  const onCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!organization) {
      const promise = createUserDocument({ title: "untitled" })
        .then((documentId) => {
          router.push(`/documents/${documentId}`)
        })

      toast.promise(promise, {
        loading: "Creating a new document...",
        success: "New document created!",
        error: "Failed to create a new document."
      })
    } else {
      const promise = createOrgDocument({ title: "untitled", orgId: organization.id })
        .then((documentId) => {
          router.push(`/documents/${documentId}`)
        })

      toast.promise(promise, {
        loading: "Creating a new document...",
        success: "New document created!",
        error: "Failed to create a new document."
      })
    }
  }

  if (!data?.length && query.search) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/nothing-found.svg"
          alt="no notes"
          height={240}
          width={240} />
        <h2> We cant find what you're looking for</h2>
        <p>Try searching for something else</p>
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="container mx-auto h-full flex flex-col items-center justify-center">
        <Image
          src="/no-boards.svg"
          alt="no notes"
          height={240}
          width={240}
        />
        <h2 className="text-zinc-800">{organization?.name!} has no notes yet.</h2>
        <div
          role="button"
          onClick={onCreate}
          className="mt-2 flex items-center bg-teal-900 hover:bg-gray-200 rounded-sm p-1 hover:text-teal-900"
        >
          <Plus className="h-6 w-6 text-teal-500 mr-2" />
          <span className="text-gray-200 hover:text-teal-900 mr-2">Document</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto h-full flex items-center justify-center">
      <Link href="/boards">
        <div className="bg-[#661438] p-4 rounded shadow">
          {JSON.stringify(query)}

        </div>
      </Link>
    </div>
  );
};

