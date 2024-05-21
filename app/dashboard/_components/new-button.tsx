"use client"; 
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/clerk-react";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <button>
            <Plus className="text-[#F5EBDE]"/>
          </button>
        </div>
      </DialogTrigger>
    </Dialog>
  );
};

export default NewButton;