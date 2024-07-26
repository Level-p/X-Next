'use client'
import { SessionProvider } from "next-auth/react"


const SesssionWrapper = ({ children }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SesssionWrapper
