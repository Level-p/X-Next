"use client"
import Link from "next/link"
import {FaXTwitter} from "react-icons/fa6"
import { HiDotsHorizontal, HiHome } from "react-icons/hi"
import DarkModeSwitch from "./DarkModeSwitch"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

export default function Sidebar() {
  const {data: session} = useSession()
  return (
      <nav className="flex flex-col p-3 justify-between h-screen">
        <div className="flex flex-col gap-4 ">
            <Link href='/'>
                <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200 dark:text-white dark:hover:bg-slate-800"/>
            </Link>
            <Link href='/' className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 dark:text-white dark:hover:bg-slate-800 w-fit">
                <HiHome className="w-7 h-7 transition-all duration-200"/>
                <span className="font-bold hidden xl:inline">Home</span>
            </Link>
            <DarkModeSwitch/>
            {
              session ? (
              <button className="bg-red-500 text-white rounded-full hover:brightness-95 shadow-md transition-all duration-200 w-32 h-9 hidden xl:inline font-normal" onClick={() => signOut()}>Sign out</button>
            ) : (
              <button className="bg-blue-500 text-white rounded-full hover:brightness-95 shadow-md transition-all duration-200 w-32 h-9 hidden xl:inline font-normal" onClick={() => signIn()}>Sign in</button>
            )
            }
        </div>
        {
          session && (
            <div className="text-sm flex items-center cursor-pointer p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-all duration-200 gap-1">
              <Image src={session.user.image} alt="user-img" width={40} height={40} className="h-10 2-10 rounded-full"/>
              <div className="hidden xl:inline">
                <h4 className="font-bold">{session.user.name}</h4>
                <p cla>@{session.user.username}</p>
              </div>
              <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline"/>
            </div>
          )
        }
      </nav>
  )
}
