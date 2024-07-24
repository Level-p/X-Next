"use client"
import { ThemeProvider } from "next-themes"

export default function Provider({children}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
        <div className="text-gray-800 dark:text-gray-50 dark:bg-slate-900 min-h-screen  transition-all duration-200 Lato">
            {children}
        </div>
    </ThemeProvider>
  )
}
