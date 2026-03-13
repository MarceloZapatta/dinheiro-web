import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

interface BaseModalProps {
  open: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

export default function BaseModal({
  open,
  toggleModal,
  children,
}: Readonly<BaseModalProps>): React.ReactNode {
  return (
    <div className="w-full p-6 flex justify-center">
      <Dialog open={open} onOpenChange={() => toggleModal()}>
        <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
      </Dialog>
    </div>
  );
}
