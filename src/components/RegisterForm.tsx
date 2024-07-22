"use client";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { register } from "~/server/auth-actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

export default function RegisterForm() {
  const [error, setError] = useState({ error: "" });

  const handleRegistration = async (formData: FormData) => {
    const result = await register(formData);
    if (result.error) {
      setError({ error: result.error });
    } else {
      setError({ error: "" });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <form action={handleRegistration}>
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
              <Link href="/login">Do you have account? Log in instead</Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <SubmitButton>Register</SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
