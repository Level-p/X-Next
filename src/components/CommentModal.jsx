/* eslint-disable @next/next/no-img-element */
"use client"

import { modalState, postIdState } from "@/atom/modelAtom"
import { useRecoilState } from "recoil"
import Modal from 'react-modal'
import { HiX } from "react-icons/hi"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, getFirestore, onSnapshot, serverTimestamp } from "firebase/firestore"
import { app } from "@/firebase"
import Image from "next/image"
import { useRouter } from "next/navigation"



export default function CommentModal() {
    const {data: session} = useSession()
    const db = getFirestore(app)
    const [open, setOpen] = useRecoilState(modalState)
    const [post, setPost] = useState({})
    const [comment, setComment] = useState('')
    const [postDataId, setPostDataId] = useRecoilState(postIdState)
    const router = useRouter()

    useEffect(() => {
        if(postDataId !== '') {
            const postRef = doc(db, 'posts', postDataId)
            const unsubcribe = onSnapshot(postRef, (snapshot) => {
                if(snapshot.exists()) {
                    setPost(snapshot.data())
                } else {
                    console.log("No such document");
                }
            })
            return () => unsubcribe
        }
    }, [db, postDataId])

    const sendComment = async() => {
        await addDoc(collection(db, 'posts', postDataId, 'comments'), {
            name: session.user.name,
            username: session.user.username,
            userImg: session.user.image,
            comment,
            timestamp: serverTimestamp()
        })
        setComment('')
        setOpen(false)
        router.push(`posts/${postDataId}`)
    }

  return (
    <div>
       {
        open && (
            <Modal 
            isOpen={open} 
            ariaHideApp={false} 
            className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-800 rounded-xl shadow-md focus:outline-none"
            onRequestClose={() => setOpen(false)}>

                <div className="p-4">
                    <div className="border-b border-gray-200 py-2 px-1 5">
                        <HiX className="text-2xl p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full cursor-pointer" onClick={() => setOpen(false)}/>
                    </div>
                    <div className="p-2 flex items-center space-x-1 relative dark:text-gray-200">
                        <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"/>
                        <Image 
                        width={50} 
                        height={50} 
                        src={post?.profileImg} 
                        className="h-11 w-11 rounded-full mr-4"
                        alt="user-img" />
                        <h4 className = "font-bold sm:text-[16px] text-[15px] hover:underline truncate">{post?.name}</h4>
                        <span className="text-sm sm:text-[15px] truncate">@{post?.username}</span>
                    </div>
                    <p className="text-gray-500 sm:text-[16px] text-[15px] dark:text-gray-50 ml-16 mb-2">{post?.tweet}</p>
                    <div className="flex p-3 space-x-3">
                        <img src={session.user.image} alt="user-img"  className="h-11 w-11 rounded-full cursor-pointer brightness-95"/>
                        <small className="w-full divide-y divide-gray-200">
                            <div>
                                <textarea 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={2} 
                                placeholder="Whats happening" 
                                className="w-full border-none tracking-wide min-h-[50px] text-lg p-1 placeholder:text-gray-400 dark:bg-slate-600 outline-none"></textarea>
                            </div>
                            <div className="flex items-center justify-end pt-2 5">
                                <button 
                                disabled={!comment.trim()}
                                onClick={sendComment}
                                className="bg-blue-400 px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                                    Reply
                                </button>
                            </div>
                        </small>
                    </div>
                </div>
            </Modal>
        )
       }
    </div>
  )
}
