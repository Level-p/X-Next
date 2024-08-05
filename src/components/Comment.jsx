"use client"
/* eslint-disable @next/next/no-img-element */

import Image from "next/image"
import { HiHeart, HiOutlineHeart } from "react-icons/hi"
import { HiDotsHorizontal } from "react-icons/hi"
import { app } from "@/firebase"
import { collection, getFirestore, onSnapshot,serverTimestamp, setDoc, doc,deleteDoc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"

export default function Comment({id, comment, commentId, originalPostId}) {
    const {data: session} = useSession()
    const [likes, setLikes] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const db = getFirestore(app)

    const likePost = async () => {
        if (session) {
            if(hasLiked) {
                await deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId, "likes",  session?.user?.uid))
            } else {
                const docRef = doc(db, 'posts', originalPostId, 'comments', commentId, "likes",  session?.user?.uid)
                 await setDoc(docRef, {
                username: session.user.username,
                timestamp: serverTimestamp()
            })
            }

           
        } else signIn()
    }

    useEffect(() => {
        onSnapshot(collection(db, "posts", originalPostId, "comments", commentId, "likes"), (snapshot) => {
            setLikes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()})))
        })
    }, [db, commentId, originalPostId])

    useEffect(() => {
        setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
    }, [likes, session?.user?.uid])

  return (
    <div className="flex p-3 border-b border-gray-200 dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 pl-10">
    <Image 
    src={comment?.userImg} 
    alt="user-image" 
    height={40} 
    width={40}
    className="rounded-full h-9 w-9 mr-4" />
    <div className="flex-1">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="text-sm font-bold truncate">{comment?.name}</h4>
                <span className="text-xs truncate">@{comment?.username}</span>
            </div>
            <HiDotsHorizontal className="text-sm"/>
        </div>
        <p className="text-gray-800 dark:text-gray-200 text-xs my-3">{comment?.comment}</p>

        <div className="flex items-center">
            {
                hasLiked ?  (
                    <HiHeart onClick={likePost} className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 text-red-500 hover:scale-105 hover:bg-red-100 dark:hover:bg-gray-700" />
                ) : (
                    <HiOutlineHeart onClick={likePost} className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 dark:hover:bg-gray-700" />
                )
            }
            {likes.length > 0 && (
                <span className="text-xs">{likes.length} {likes.length === 1 ? "like" : "likes"}</span>
            )}
        </div>
    </div>
</div>
  )
}
