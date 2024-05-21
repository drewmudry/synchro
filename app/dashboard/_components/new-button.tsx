"use client"; 
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <div className="aspect-square hover:bg-[#661438]">
          <button className="h-full w-full rounded-sm flex items-center justify-center">
            <Plus className="text-[#F5EBDE]"/>
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="p-10">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;