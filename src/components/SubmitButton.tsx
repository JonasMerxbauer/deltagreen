"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui/button";

export const SubmitButton = ({ children, ...rest }: ButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...rest}>
      {pending ? "Pending..." : children}
    </Button>
  );
};
