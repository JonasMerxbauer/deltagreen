import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { DeleteButton } from "~/components/DeleteButton";

export default async function Page() {
  const tasks = await api.task.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-[960px]">
          <Card>
            <CardHeader className="flex justify-between">
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Due date</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button asChild>
                          <Link href={`task/${task.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteButton id={task.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex">
              <Button asChild>
                <Link href="/task/new">Create new task</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </HydrateClient>
  );
}
