import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

export default async function ProtectedRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (!session?.user) {
    redirect("/auth/login")
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  )
}
