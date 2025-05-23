import Link from 'next/link'
import { CircleIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center">
      <div className="max-w-md space-y-8 p-4 text-center">
        <div className="flex justify-center"></div>
        <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
        <p className="text-muted-foreground text-base">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button className="">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
