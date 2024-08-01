'use client'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"

const SesssionWrapper = ({ children }) => {
  return (
    <SessionProvider>
        <RecoilRoot>
          {children}
        </RecoilRoot>
    </SessionProvider>
  )
}

export default SesssionWrapper
