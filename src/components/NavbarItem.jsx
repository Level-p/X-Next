"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavbarItem({path, Icon, title}) {
    const pathname = usePathname()
  return (
    <Link href={path} className={`tracking-wider border-none sm:border-b border-slate-500 w-full py-3 hover:bg-slate-100 dark:hover:bg-slate-500 transition-all duration-150 flex justify-center items-center gap-1 group ${pathname && pathname === path && '!text-blue-500 rounded'}`}>
           <Icon className="h-5 w-5"/>
            {title ? title : ''}
    </Link>
  )
}
