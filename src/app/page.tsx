import Link from "next/link";
import { redirect } from "next/navigation";

import { LatestPost } from "~/app/_components/post";
import { Calendar } from "~/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { logout } from "~/server/actions";
import { validateRequest } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

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
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">
                  <Link href={`task/${task.id}`}>{task.name}</Link>
                </TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {new Date(task.dueDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Calendar mode="single" />
        <form action={logout}>
          <button>Sign out</button>
        </form>
      </main>
    </HydrateClient>
  );
}
