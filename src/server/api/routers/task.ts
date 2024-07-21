import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        dueDate: z.date(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.task.create({
        data: {
          name: input.name,
          description: input.description,
          dueDate: input.dueDate,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  getTask: protectedProcedure
    .input(z.object({ id: z.number().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.task.findFirst({
        where: { id: input.id, createdBy: { id: ctx.session.user.id } },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
