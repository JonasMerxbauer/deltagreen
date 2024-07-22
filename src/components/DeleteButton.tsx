"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { deleteTask } from "~/server/task-actions";
import { useToast } from "./ui/use-toast";

export function DeleteButton({ id }: { id: number }) {
  const { toast } = useToast();

  return (
    <Button
      onClick={async () => {
        const res = await deleteTask(id);

        if (res && res.error) {
          toast({
            title: "Error while deleting task",
            description: res.error,
            variant: "destructive",
          });
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
