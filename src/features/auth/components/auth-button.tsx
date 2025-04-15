import { Button } from '@/components/ui/button'
import { signOutAction } from '../server/action/auth'

export default function SignOutButton() {
  return <Button onClick={signOutAction}>Sign out</Button>
}
