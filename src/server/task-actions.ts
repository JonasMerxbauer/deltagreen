"use server";

import { z } from "zod";
import { validateRequest } from "./auth";
import { db } from "./db";

export const createTask = async (FormData: FormData) => {
  const name = z.string().safeParse(FormData.get("name"));
  const description = z.string().safeParse(FormData.get("description"));
  const dueDateString = z.string().safeParse(FormData.get("dueDate"));

  const session = await validateRequest();

  if (
    !name ||
    !description ||
    !dueDateString ||
    !name.success ||
    !description.success ||
    !dueDateString.success ||
    !session.user
  ) {
    return null;
  }

  const dueDate = new Date(dueDateString.data);

  const task = await db.task.create({
    data: {
      name: name.data,
      description: description.data,
      dueDate: dueDate,
      createdBy: { connect: { id: session.user.id } },
    },
  });
  return task;
};

export const updateTask = async (FormData: FormData) => {
  const id = z.string().safeParse(FormData.get("id"));
  const name = z.string().safeParse(FormData.get("name"));
  const description = z.string().safeParse(FormData.get("description"));
  const dueDateString = z.string().safeParse(FormData.get("dueDate"));

  const session = await validateRequest();

  if (
    !id ||
    !name ||
    !description ||
    !dueDateString ||
    !id.success ||
    !name.success ||
    !description.success ||
    !dueDateString.success ||
    !session.user
  ) {
    return null;
  }

  const dueDate = new Date(dueDateString.data);

  const task = await db.task.update({
    where: { id: Number(id.data), createdBy: { id: session.user.id } },
    data: {
      name: name.data,
      description: description.data,
      dueDate: dueDate,
    },
  });
  return task;
};
