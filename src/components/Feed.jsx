import Post from "./Post"
import { collection, getFirestore, orderBy, getDocs, query } from "firebase/firestore"
import { app } from "@/firebase"

export default async function Feed() {
    const db = getFirestore(app)
    let data = []
    const q = query(collection(db, 'posts'), orderBy("timestamp", 'desc'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => data.push({id: doc.id, ...doc.data()}))

  return (
    <div>
        {data.map((post) => (
            <Post key={post.id} post={post} id={post.id}/>
        ))}
    </div>
  )
}
