"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface TaskSectionProps {
  orgId: string, 
  query: {
    search?: string, 

  }
}

export const TaskSection = ({orgId, query}: TaskSectionProps) => {

  const data = [] //placeholder for api call data 

  if(!data?.length && query.search){
    return(
      <div className="h-full flex flex-col items-center justify-center">
        <Image 
        src="/nothing-found.svg"
        alt="no tasks"
        height={240}
        width={240}/>
        <h2> We cant find what you're looking for</h2>
        <p>Try searching for something else</p>
      </div>
    )
  }

  if(!data?.length){
    return(
      <div className="h-full flex flex-col items-center justify-center">
        <Image 
        src="/no-boards.svg"
        alt="no boards"
        height={240}
        width={240}/>
        <h2 className="text-zinc-800"> You have no Tasks in this Organization</h2>
        <div className="mt-6">
          <Button className="bg-teal-900 text-gray-200">Create Tasks</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <Link href="/boards">
        <div className="bg-[#661438] p-4 rounded shadow">
          {JSON.stringify(query)}

        </div>
      </Link>
    </div>
  );
};

