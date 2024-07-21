import { api } from "~/trpc/server";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { TaskForm } from "~/components/TaskForm";

export default async function Page({ params }: { params: { task: string } }) {
  if (!params.task || isNaN(Number(params.task))) {
    return <div>No task found</div>;
  }

  const task = await api.task.getTask({ id: Number(params.task) });

  if (!task) {
    return <div>No task found</div>;
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
