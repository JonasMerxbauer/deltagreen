import { api } from "~/trpc/server";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { TaskForm } from "~/components/TaskForm";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { task: string } }) {
  if (!params.task || isNaN(Number(params.task))) {
    return notFound();
  }

  const task = await api.task.getTask({ id: Number(params.task) });

  if (!task) {
    return notFound();
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Task #{task.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm
          isNew={false}
          taskId={task.id}
          name={task.name}
          description={task.description}
          dueDate={task.dueDate}
        />
      </CardContent>
    </Card>
  );
}
