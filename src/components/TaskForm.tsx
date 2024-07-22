"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn, ignoreTimezone } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "./ui/input";
import { createTask, updateTask } from "~/server/task-actions";
import { useState } from "react";
import { Alert, AlertTitle } from "./ui/alert";

export const TaskFormSchema = z.object({
  name: z
    .string({
      required_error: "A name is required.",
    })
    .min(1),
  description: z
    .string({
      required_error: "A description is required.",
    })
    .min(1),
  dueDate: z.date({
    required_error: "A due dateis required.",
  }),
});

export function TaskForm({
  isNew = true,
  taskId,
  name,
  description,
  dueDate,
}: {
  isNew?: boolean;
  taskId?: number;
  name?: string;
  description?: string;
  dueDate?: Date;
}) {
  const [error, setError] = useState({ error: "" });
  const form = useForm<z.infer<typeof TaskFormSchema>>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      name: name ?? "",
      description: description ?? "",
      dueDate: dueDate ?? new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof TaskFormSchema>) => {
    if (isNew && !taskId) {
      const result = await createTask({
        ...data,
        dueDate: ignoreTimezone(data.dueDate),
      });
      if (result?.error) {
        setError({ error: result.error });
      }
    } else {
      const result = await updateTask({
        id: Number(taskId),
        ...data,
        dueDate: ignoreTimezone(data.dueDate),
      });
      if (result?.error) {
        setError({ error: result.error });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task name</FormLabel>
              <FormControl>
                <Input className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        {error.error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{error.error}</AlertTitle>
          </Alert>
        )}
        <Button disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting
            ? isNew
              ? "Create"
              : "Update"
            : isNew
              ? "Creating..."
              : "Updating..."}
        </Button>
      </form>
    </Form>
  );
}
