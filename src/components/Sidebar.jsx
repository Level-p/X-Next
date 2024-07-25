import Link from "next/link"
import {FaXTwitter} from "react-icons/fa6"
import { HiHome } from "react-icons/hi"
import DarkModeSwitch from "./DarkModeSwitch"

export default function Sidebar() {
  return (
      <nav className="flex flex-col gap-4 p-3">
        <Link href='/'>
            <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200 dark:text-white dark:hover:bg-slate-800"/>
        </Link>
        <Link href='/' className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 dark:text-white dark:hover:bg-slate-800 w-fit">
            <HiHome className="w-7 h-7 transition-all duration-200"/>
            {/* <span className="font-bold hidden xl:inline">Home</span> */}
        </Link>
        <DarkModeSwitch/>
        <button className="bg-blue-500 text-white rounded-full hover:brightness-95 shadow-md transition-all duration-200 w-32 h-9 hidden xl:inline font-normal">Sign in</button>
        
      </nav>
  )
}
