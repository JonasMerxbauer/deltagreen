import { logout } from "~/server/auth-actions";
import { validateRequest } from "~/server/auth";
import { SubmitButton } from "./SubmitButton";

export default async function LogoutButton() {
  const session = await validateRequest();

  if (!session.user) {
    return null;
  }

  return (
    <form action={logout}>
      <SubmitButton>Sign out</SubmitButton>
    </form>
  );
}
