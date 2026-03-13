"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BaseModal from "@/components/modal/base-modal";
import { Spinner } from "@/components/ui/spinner";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface FormModalProps {
  readonly dialogTitle: string;
  readonly dialogDescription: string;
  toggleModal: () => void;
  readonly open: boolean;
  methods: UseFormReturn<FieldValues, any, FieldValues>;
  handleSave: (data: FieldValues) => Promise<void>;
  handleDelete: () => Promise<void>;
  formFields: React.ReactNode;
  loading: boolean;
  isEditForm: boolean;
}

export default function FormModal({
  open,
  toggleModal,
  dialogTitle,
  dialogDescription,
  methods,
  handleSave,
  handleDelete,
  formFields,
  loading,
  isEditForm,
}: Readonly<FormModalProps>) {
  return (
    <BaseModal open={open} toggleModal={toggleModal}>
      <FormProvider {...methods}>
        <DevTool control={methods.control} />
        <form onSubmit={methods.handleSubmit(handleSave)}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">{formFields}</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" disabled={loading} variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            {isEditForm && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Deletar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que deseja excluir?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      {loading ? <Spinner /> : "Deletar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </BaseModal>
  );
}
