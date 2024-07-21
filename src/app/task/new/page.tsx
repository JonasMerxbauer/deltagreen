import { TaskForm } from "~/components/TaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Page() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create a task</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskForm />
      </CardContent>
    </Card>
  );
}
