'use client'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import React from 'react'
import { usePathname } from 'next/navigation'
import { NavigationMenuItem } from './navigation-menu'

const SiteNavItem = ({ href, title }: { href: string; title: string }) => {
  const path = usePathname()
  const isActive = path === href
  return (
    <NavigationMenuItem>
      <Link
        className={cn(isActive && 'text-primary/70', 'hover:text-primary/90')}
        href={href}
      >
        <span>{title}</span>
      </Link>
    </NavigationMenuItem>
  )
}
export default SiteNavItem
