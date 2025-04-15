import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { auth } from '@/server/auth'
import { ModeToggle } from './theme-toggle'
import { Button } from './button'
import SignOutButton from './auth-button'
import { Avatar, AvatarImage } from './avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'
import { NavigationMenu, NavigationMenuItem } from './navigation-menu'
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import SiteNavItem from './site-nav-items'

export default async function Header() {
  const session = await auth()
  const navItems = [
    { title: 'Home', href: '/' },
    { title: 'Posts', href: '/posts' },
  ]

  return (
    <div className="flex w-full flex-row items-center justify-between border-b px-3 py-1">
      <div className="flex flex-row gap-4">
        <Link href="/">
          <h1 className="text-primary hover:text-primary/80 text-lg font-bold duration-300 md:text-lg">
            Next Starter
          </h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <NavigationMenu className="text-md hidden list-none flex-row items-center gap-3 md:flex">
        <div className="flex flex-row gap-2">
          {navItems.map(({ title, href }) => (
            <SiteNavItem href={href} key={title} title={title} />
          ))}
        </div>

        <ModeToggle />
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage
                  src={session.user.image ?? ''}
                  alt={`${session.user.name}'s avatar`}
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-3 p-2">
              <div>
                <p className="text-sm font-semibold">{session.user.name}</p>
                <p className="text-muted-foreground text-xs">
                  {session.user.email}
                </p>
              </div>
              <DropdownMenuItem asChild>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </NavigationMenu>

      {/* Mobile Drawer */}
      <Drawer>
        <DrawerTrigger className="flex md:hidden">
          <MenuIcon className="h-4 w-4" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-center justify-center gap-2">
            <DrawerTitle className="flex items-center justify-center">
              <span>Next Starter</span>
              <div className="absolute right-10 justify-end">
                <ModeToggle />
              </div>
            </DrawerTitle>
            {session?.user && (
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    src={session.user.image ?? ''}
                    alt={`${session.user.name}'s avatar`}
                  />
                </Avatar>
                <p className="text-sm font-semibold">{session.user.name}</p>
                <p className="text-muted-foreground text-xs">
                  {session.user.email}
                </p>
              </div>
            )}
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex flex-col items-center">
              {navItems.map(({ title, href }) => (
                <DrawerHeader className="py-1" key={title}>
                  <Link href={href} className="text-sm">
                    {title}
                  </Link>
                </DrawerHeader>
              ))}
              {!session?.user ? (
                <DrawerHeader className="py-1">
                  <Button asChild>
                    <Link href="/auth/login">Login</Link>
                  </Button>
                </DrawerHeader>
              ) : (
                <DrawerHeader className="py-1">
                  <SignOutButton />
                </DrawerHeader>
              )}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
