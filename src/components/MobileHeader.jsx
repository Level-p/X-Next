"use client"

import { MdAccountCircle} from "react-icons/md";
import { FaHome } from "react-icons/fa"
import { CiSearch } from "react-icons/ci"
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";
import NavbarItem from "./NavbarItem";
import DarkModeSwitch from "./DarkModeSwitch";

export default function MobileAdminHeader() {
    // const {data: session} = useSession()
  return (
    <header className="block sm:hidden">
        <nav className="fixed bottom-0 w-full flex items-center justify-center gap-1 bg-gray-50 dark:bg-slate-800">
      <NavbarItem path="/" Icon={FaHome}/>
      <NavbarItem path="/search" link="/search" Icon={CiSearch}/>
      <NavbarItem path="/profile" link="/profile" Icon={MdAccountCircle}/>
          {/* {session ? (
                  <button onClick={() => signOut()} className="tracking-wider border-none sm:border-b  w-full py-3 hover:bg-gray-100 transition-all duration-150 flex justify-center items-center gap-1 group">
                  <RiLogoutCircleLine className="text-2xl group-hover:text-amber-600 rotate-90"/>
              </button>
              ) : (
                <button onClick={() => signIn()} className="tracking-wider border-none sm:border-b  w-full py-3 hover:bg-gray-100 transition-all duration-150 flex justify-center items-center gap-1 group">
                <AiOutlineLogin className="text-2xl group-hover:text-amber-600 rotate-90"/>
            </button>
              )} */}
      </nav>
    </header>
  )
}
