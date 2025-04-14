import { auth } from "@/server/auth";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./button";
import SignOutButton from "./auth-button";
import Link from "next/link";

export default async function Header() {
  const session = await auth()
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Posts", href: "/posts" },
  ]
  return (
    <div className="flex items-center justify-between border-b px-3 py-1">
      <Link href="/" className="font-bold text-xl justify-start text-primary">Next Starter</Link>
      <div
        className="flex items-center flex-row justify-end gap-2"

      >
        {
          navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className="text-sm ">{item.name}</span>
            </Link>
          ))
        }
        {
          session?.user ? (
            <SignOutButton />
          ) : (
            <Button

            >
              <Link href="/auth/login">
                Login
              </Link>
            </Button>
          )
        }

        <ModeToggle />
      </div>
    </div>
  )
}
