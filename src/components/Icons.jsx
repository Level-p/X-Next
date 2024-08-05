"use client"

import { HiHeart, HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi"
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { signIn, useSession } from "next-auth/react";
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { app } from "@/firebase";
import { useEffect, useState } from "react";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/atom/modelAtom";


export default function Icons({ id, postId, deleteImg }) {
    const {data: session} = useSession()
    const db = getFirestore(app)
    const storage = getStorage(app)
    const [open, setOpen] = useRecoilState(modalState)
    const [postDataId, setPostDataId] = useRecoilState(postIdState)
    const [likes, setLikes] = useState([])
    const [bookmarks, setBookmarks] = useState([])
    const [comments, setComments] = useState([])
    const [hasLiked, setHasLiked] = useState(false)
    const [hasBookmarked, setHasBookmarked] = useState(false)

    const likePost = async () => {
        if (session) {
            if(hasLiked) {
                await deleteDoc(doc(db, 'posts', id, 'likes', session?.user?.uid))
            } else {
                const docRef = doc(db, 'posts', id, 'likes', session.user.uid)
                 await setDoc(docRef, {
                username: session.user.username,
                timestamp: serverTimestamp()
            })
            }

           
        } else signIn()
    }

    const bookmarkPost = async () => {
        if(session) {
            if(hasBookmarked) {
                await deleteDoc(doc(db, 'posts', id, 'bookmarks', session?.user?.uid))
            } else {
                const docRef = doc(db, 'posts', id, 'bookmarks', session.user.uid)
                await setDoc(docRef, {
                    username: session.user.username,
                    timestamp: serverTimestamp()
                })
            }
        
        } else signIn()
    }

    const deletePost = async () => {
        if(window.confirm('Are you sure you want to delete?')) {
            await deleteDoc(doc(db, 'posts', id))
            if(deleteImg) {
                await deleteObject(ref(storage, deleteImg)) 
            } else return
        }
    }

    useEffect(() => {
        const items = ['likes', 'bookmarks', 'comments']
        items.forEach(item => {
            onSnapshot(collection(db, 'posts', id, item), (snapshot) => {
                switch (item) {
                    case "likes": 
                    setLikes(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
                    break
                    case "bookmarks": 
                    setBookmarks(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
                    break
                    case "comments": 
                    setComments(snapshot.docs)
                    break
                    default: 
                    break
                }
            })
            })
    }, [db, id])

    useEffect(() => {
        setHasLiked(likes.findIndex(like => like.id === session?.user?.uid) !== -1)
        setHasBookmarked(bookmarks.findIndex(bok => bok.id === session?.user?.uid) !== -1)
    }, [likes, bookmarks, session?.user?.uid])


  return (
    <section className="flex justify-between items-center gap-5">
        <div className="flex justify-start gap-5 p-2">
            <div className="flex items-center">
                <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100 dark:hover:bg-gray-700" onClick={() => {
                    if(!session) return signIn()
                    else {
                        setOpen(!open)
                        setPostDataId(id)
                    }
                }}/> 
                {
                    comments.length > 0 && (
                        <span className="text-xs">{comments.length}</span>
                    )
                }
            </div>
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
            
            <div>
                {
                    session?.user?.uid === postId && <HiOutlineTrash onClick={deletePost} className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100 dark:hover:bg-gray-700" />
                }
            </div>
        </div>
        
        <aside>
            {
                hasBookmarked ?  (
                    <FaBookmark onClick={bookmarkPost} className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 text-sky-500 
                    hover:scale-105 hover:bg-sky-100 dark:hover:bg-gray-700 mr-4" />
                ) : (
                    <FaRegBookmark onClick={bookmarkPost} className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100 dark:hover:bg-gray-700 mr-4" />
                )
            }
        </aside>
    </section>
  )
}
