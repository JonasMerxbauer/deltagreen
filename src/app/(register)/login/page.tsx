import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { login } from "~/server/auth-actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";

export default async function Page() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <form action={login}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input name="username" id="username" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" id="password" />
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Link href="/signup">
                Don&apos;t have an account? Register now
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
