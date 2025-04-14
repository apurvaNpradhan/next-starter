import { ModeToggle } from "@/components/ui/theme-toggle";
import { auth } from "@/server/auth";

export default async function Page() {
  const session = await auth()

  return (
    <div className="flex flex-col min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {
        session?.user ? (
          <h1 className="text-xl font-bold tracking-tight text-center ">
            Welcome {session.user.name}
          </h1>
        ) : (
          <h1 className="text-xl font-bold tracking-tight text-center ">
            You are not logged in
          </h1>
        )
      }
      <h1 className="text-4xl font-bold tracking-tight text-center text-primary">
        A simple NextJS starter
      </h1>
      <div className="mt-6 flex flex-col items-center justify-center gap-4">
        <ModeToggle />
        Goodies
      </div>


    </div>
  )
}
