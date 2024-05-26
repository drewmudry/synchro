import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogTrigger
 } from "@/components/ui/dialog";
export const EmptyOrg = () => {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <Image 
          src = "/teamwork.svg"
          alt="empty organizaion"
          height={300}
          width={300}
          />

          <h2 className="font-helvetica text-2xl font-bold text-rose-900">Welcome to Synchro</h2>
          <p className="font-helvetica font-semibold text-rose-800"> Create or Join an organization to get started</p>
          <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="size-lg bg-rose-900">
                            Organizations
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                        <CreateOrganization/>
                    </DialogContent>
                </Dialog>
          </div>
        </div>
      </div>
    );
  };