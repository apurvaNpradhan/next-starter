"use server";

import { signIn, signOut } from "@/server/auth";

export async function signInWithGithubAction() {
  await signIn("github", { redirectTo: "/" });
}
export async function signOutAction() {
  await signOut({
    redirectTo: "/auth/login",
  });
}
