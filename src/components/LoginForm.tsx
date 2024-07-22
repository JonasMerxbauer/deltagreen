"use client";

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
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";
import { SubmitButton } from "./SubmitButton";

export default function LoginForm() {
  const [error, setError] = useState({ error: "" });

  const handleLogin = async (formData: FormData) => {
    const result = await login(formData);
    if (result.error) {
      setError({ error: result.error });
    } else {
      setError({ error: "" });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <form action={handleLogin}>
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
              {error.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{error.error}</AlertTitle>
                </Alert>
              )}
            </div>
            <div className="flex flex-col items-center space-y-1.5">
              <Link href="/register">
                Don&apos;t have an account? Register now
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <SubmitButton>Login</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
