"use client"

import { editProfile, profileState } from "@/atom/modelAtom";
import { app } from "@/firebase";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";

import { useRecoilState } from "recoil";
import Post from "@/components/Post";

export default function Profile() {
    const {data: session} = useSession()
    const [open, setOpen] = useRecoilState(editProfile)
    const [profileStateData, setprofileStateData] = useRecoilState(profileState)
    const [profile, setProfile] = useState([])
    const [data, setData] = useState([])
    console.log(data);
    const db = getFirestore(app)

    useEffect(() => {
        onSnapshot(query(collection(db, 'profile'), where("uid", "==", `${session?.user?.uid}`)), (snapshot) => {
            setProfile(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})))
        })

        onSnapshot(query(collection(db, 'posts'), where("uid", "==", `${session?.user?.uid}`)), (snapshot) => {
            setData(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        })
    }, [db,session?.user?.uid])

  return (
    <>
    <section className="max-w-xl mx-auto border-r border-l min-h-screen bg-no-repeat">
        <Image src={profile[0]?.profileImage || session?.user?.image} alt="userImage" height={40} width={40} className="h-32 w-full object-cover rounded-b-md"/>
 
        <div className="flex flex-col justify-start rounded-b-md px-3 relative">
            <div className="flex space-x-2 items-center  px-5">
                <Image src={profile[0]?.profileImage || session?.user?.image} alt="userImage" height={40} width={40} className="h-11 w-11 rounded-full ring-2 ring-green-200"/>
                <span className="text-xs font-bold">@{profile[0]?.username ||  session?.user?.username}</span>
            </div>

            <span className="text-sm mt-1 font-semibold">{profile[0]?.name ||  session?.user?.name}</span>
            <p className="text-sm font-normal py-1">{profile[0]?.bio || 'Hello everyone, I am new on x'}</p>

            <FaPen className="absolute right-5 bottom-5 text-2xl p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full cursor-pointer" onClick={() => {
                setOpen(!open)
                setprofileStateData(profile[0])
            }}/>
        </div>

        <header className="flex items-center justify-between border-y">
            <span 
            className={`tracking-wider w-full py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-150 text-center border-r ${data.length !== 0 && '!border-b-2 !border-b-blue-500'}`}>Posts</span>
            <span className="tracking-wider w-full py-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-150 text-center">Likes</span>
        </header>

        <div>
            {data.map((post) => (
                <Post key={post.id} post={post} id={post.id}/>
            ))}
        </div>
    </section>
   
    </>
  )
}
