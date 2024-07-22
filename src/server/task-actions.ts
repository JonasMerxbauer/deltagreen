"use server";

import { z } from "zod";
import { validateRequest } from "./auth";
import { db } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TaskFormSchema } from "~/components/TaskForm";
import { error } from "console";

export const createTask = async ({
  name,
  description,
  dueDate,
}: z.infer<typeof TaskFormSchema>) => {
  const session = await validateRequest();

  if (!session.user) {
    return { error: "Unauthorized" };
  }

  const task = await db.task.create({
    data: {
      name: name,
      description: description,
      dueDate: dueDate,
      createdBy: { connect: { id: session.user.id } },
    },
  });

  if (!task) {
    return { error: "Failed to create task" };
  }

  revalidatePath("/");

  return redirect("/");
};

export const updateTask = async ({
  id,
  name,
  description,
  dueDate,
}: { id: number } & z.infer<typeof TaskFormSchema>) => {
  const session = await validateRequest();

  if (!session.user) {
    return { error: "Unauthorized" };
  }

  const task = await db.task.update({
    where: { id: Number(id), createdBy: { id: session.user.id } },
    data: {
      name: name,
      description: description,
      dueDate: dueDate,
    },
  });

  if (!task) {
    return { error: "Failed to update task" };
  }

  revalidatePath("/");

  return redirect("/");
};

export const deleteTask = async (id: number) => {
  const session = await validateRequest();

  if (!session.user) {
    return { error: "Unauthorized" };
  }

  const task = await db.task.delete({
    where: { id: Number(id), createdBy: { id: session.user.id } },
  });

  if (!task) {
    return { error: "Failed to delete task" };
  }

  return revalidatePath("/");
};
