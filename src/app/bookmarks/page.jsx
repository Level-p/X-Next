"use client"

import { app } from '@/firebase'
import { collection, doc, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { HiArrowLeft } from 'react-icons/hi'
import Link from 'next/link'
import Post from '@/components/Post'
import { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

export default  function Bookmarks() {
    const {data: session} = useSession()
    const db = getFirestore(app)
    const [posts, setPosts] = useState([])
    const [saved, setSaved] = useState([])
    const data = saved.flat(1)
    
    useEffect(() => {
        onSnapshot(collection(db, "posts"), (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        })
    }, [db])

    useEffect(() => {
      let bookmarks = []
      if (Array.isArray(posts) && posts.length !== 0) {
        posts.forEach(postID => {
          if (typeof postID.id === 'string') {
            const q = query(
              collection(db, "posts", postID.id, "bookmarks"),
              orderBy("bookmarktimestamp", "desc"),
              where("bookmarkeduser", "==", session?.user?.username)
            );
    
            onSnapshot(q, (snapshot) => {
              bookmarks.push(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            });
          } else {
            console.error('postID is not a string:', postID);
          }
        });

        setSaved(bookmarks)
      }


    }, [db, posts, session?.user?.username]);

    
  return (
    <div className='max-w-xl mx-auto border-r border-l min-h-screen'>
      <div className='flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-400'>
          <Link href='/' className='hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full p-2'>
              <HiArrowLeft className='h-5 w-5 '/>
          </Link>
          <h2 className='sm:text-lg '>Back</h2>
      </div>
       {
          data.length !== 0 ? (
           <div>
              {
                 data.map(pos => (
                  <Post key={pos.post.id} post={pos.post} id={pos.post.id}/>
              ))
              }
           </div>
          ) : (
            <span className='text-xl tracking-wider font-bold flex flex-col self-center justify-start'>No Bookmarks Yet</span>
          )
       }
    </div>
  )
}
