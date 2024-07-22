import { logout } from "~/server/auth-actions";
import { Button } from "./ui/button";
import { validateRequest } from "~/server/auth";

export default async function LogoutButton() {
  const session = await validateRequest();

  if (!session.user) {
    return null;
  }

  return (
    <form action={logout}>
      <Button>Sign out</Button>
    </form>
  );
}
