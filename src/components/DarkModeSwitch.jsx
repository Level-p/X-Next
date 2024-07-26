'use client'

import {MdLightMode, MdDarkMode} from 'react-icons/md'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DarkModeSwitch() {
  const {theme, setTheme, systemTheme} = useTheme()
  const [mounted, setMounted] = useState(false)
  const currentTheme = theme === 'system' ? systemTheme: theme

  useEffect(() => setMounted(true), [])
  return (
    <div>
    {mounted 
    && (currentTheme === 'dark' ? (
      <div className='p-3 flex items-center hover:bg-slate-800 rounded-full transition-all duration-200 cursor-pointer w-fit'  onClick={() => setTheme('light')} >
          <MdLightMode  
          className='w-7 h-7 hover:text-gray-400'
          /> 
          <span className="font-bold hidden xl:inline">Theme</span>
      </div>
    ): ( 
      <div className='p-3 flex items-center hover:bg-gray-100 rounded-full transition-all duration-200 cursor-pointer w-fit' onClick={() => setTheme('dark')} >
      <MdDarkMode  
      className='w-7 h-7 hover:text-gray-400'
      /> 
        <span className="font-bold hidden xl:inline">Theme</span>
    </div>
    ))
    
  }
  </div>
  )
}
