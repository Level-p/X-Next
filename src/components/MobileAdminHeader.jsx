"use client"

import { MdAccountCircle} from "react-icons/md";
import { FaHome } from "react-icons/fa"
import { RiLogoutCircleLine } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";
import { MdBookmark } from "react-icons/md";
import NavbarItem from "./NavbarItem";

export default function MobileAdminHeader() {
    const {data: session} = useSession()
  return (
    <header className="block sm:hidden">
        <nav className="fixed bottom-0 w-full flex items-center justify-center gap-1 bg-gray-50 dark:bg-slate-800">
      <NavbarItem path="/" Icon={FaHome}/>
      { session && <NavbarItem path="/profile" link="/profile" Icon={MdAccountCircle}/>}
      {session && <NavbarItem path="/bookmarks" link="/bookmarks" Icon={MdBookmark}/>}
          {session ? (
                  <button onClick={() => signOut()} className="tracking-wider border-none sm:border-b  w-full py-3 hover:bg-gray-100 transition-all duration-150 flex justify-center items-center gap-1 group">
                  <RiLogoutCircleLine className="h-5 w-5 group-hover:text-blue-500 rotate-90"/>
              </button>
              ) : (
                <button onClick={() => signIn()} className="tracking-wider border-none sm:border-b  w-full py-3 hover:bg-gray-100 transition-all duration-150 flex justify-center items-center gap-1 group">
                <AiOutlineLogin className="h-5 w-5 group-hover:text-blue-500 rotate-90"/>
            </button>
              )}
      </nav>
    </header>
  )
}
