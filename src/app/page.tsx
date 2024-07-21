import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { logout } from "~/server/auth-actions";
import { validateRequest } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  // void api.post.getLatest.prefetch();

  const tasks = await api.task.getAll();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Button asChild>
          <Link href="/task/new">Create new task</Link>
        </Button>
        <div className="w-[960px]">
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
                  <TableCell>
                    <Button asChild>
                      <Link href={`task/${task.id}`}>Edit</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <form action={logout}>
          <button>Sign out</button>
        </form>
      </main>
    </HydrateClient>
  );
}
