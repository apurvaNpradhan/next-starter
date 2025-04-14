import { signOutAction } from "@/app/auth/actions";
import { Button } from "./button";

export default function SignOutButton() {
  return (
    <Button onClick={signOutAction}>
      Sign out
    </Button>


  )
}
