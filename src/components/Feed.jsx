"use client"

import { app } from "@/firebase"
import { collection, getDocs, orderBy, query, getFirestore, onSnapshot } from "firebase/firestore"
import Post from "./Post"
import { useEffect, useState } from "react"

export default  function Feed() {
    const db = getFirestore(app)
    const [data, setData] = useState([])

    useEffect(() => {
      onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), (snapshot) => {
          setData(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
      })
    }, [data, db])
  return (
    <div className="pb-10">
        {data.map((post) => (
            <Post key={post.id} post={post} id={post.id}/>
        ))}
    </div>
  )
}
