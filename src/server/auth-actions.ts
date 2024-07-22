"use server";

import { db } from "~/server/db";
import { hash, verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "~/server/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";

interface ActionResult {
  error: string;
}

export async function register(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  if (typeof username !== "string" || username.length < 2) {
    return {
      error: "Invalid username, must be at least 2 characters",
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 2) {
    return {
      error: "Invalid password, must be at least 2 characters",
    };
  }

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  const userId = generateIdFromEntropySize(10);

  const existingUser = await db.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });

  if (existingUser) {
    return {
      error: "Username already taken",
    };
  }

  await db.user.create({
    data: {
      id: userId,
      username: username,
      password_hash: passwordHash,
    },
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function login(formData: FormData): Promise<ActionResult> {
  const username = formData.get("username");
  if (typeof username !== "string") {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string") {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
  });
  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await verify(existingUser.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/");
}

export async function logout(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
}
