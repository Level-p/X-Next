/* eslint-disable @next/next/no-img-element */
"use client"

import { useSession } from "next-auth/react"
import { HiOutlinePhotograph } from "react-icons/hi"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { addDoc, collection, getFirestore, serverTimestamp} from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { app } from "@/firebase"

export default function Input() {
    const {data: session} = useSession()
    const db = getFirestore(app)
    const imagePick = useRef(null)
    const [selectedFile, setSelecetedFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageUploading, setImageUploading] = useState(false)
    const [postLoading, setPostLoading] = useState(false)
    const [tweet, setTweet] = useState('')

    const  addImageToPost = (e) => {
      e.preventDefault()
      const file = e.target.files[0]
      if(file) {
        setImageFileUrl(URL.createObjectURL(file))
        setSelecetedFile(file)
      }
    }

    useEffect(() => {
      if (selectedFile) {
        uploadImageToFirestore()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile])

    const uploadImageToFirestore = async() => {
      setImageUploading(true)
      const storage = getStorage(app)
      const filename = new Date().getTime() + '-' + selectedFile.name 
      const storageRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(storageRef, selectedFile)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            switch (snapshot.state) {
              case 'paused':
              console.log('Upload is paused')
              break
              case 'running':
                  console.log('Upload is running' + progress + '%');
                  break
              case 'success': 
                  console.log('Upload is success');
              default: 
              break
          }
        },
        (error) => {
          setSelecetedFile(null)
          setImageUploading(false)
          setImageFileUrl(null)
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
            setImageFileUrl(downloadUrl)
            setImageUploading(false)
          })
        }
      )
    }

    const handleSubmit = async(e) =>{
      e.preventDefault()
      setPostLoading(true)
      const docRef = await addDoc(collection(db, "posts"), {
        uid: session.user.uid,
        username: session.user.username,
        tweet,
        profileImg: session.user.image,
        image: imageFileUrl,
        timestamp: serverTimestamp()
      });
      setPostLoading(false)
      setTweet('')
      setSelecetedFile(null)
      setImageFileUrl(null)
    }

    if(!session) return null
  return (
    <section className="flex border-b border-gray-200 dark:border-gray-400 p-3 space-x-3 w-full">
        <Image 
        src={session.user.image} 
        alt="user-img" 
        width={40} 
        height={40} className="h-11 w-11 rounded-full cursor-pointer  hover:brightness-95"/>
        <div className="w-full divide-y divide-gray-200">
            <textarea 
            className="w-full border-none outline-none tracking-wide min-h-[50px] dark:bg-slate-700"  
            rows={2} 
            placeholder="What's happening" 
            value={tweet} 
            onChange={(e) => setTweet(e.target.value)}></textarea>
            {
                  selectedFile && (
                    <Image width={40} height={40} src={imageFileUrl} alt="image" className={`w-full max-h-[250px] object-cover cursor-pointer rounded-md ${imageUploading ? 'animate-pulse': ''}`} onClick={() => setSelecetedFile(null)}/>
                  )
            }
            <div className="flex items-center justify-between pt-2.5 transition-all duration-200">
                <HiOutlinePhotograph onClick={() => imagePick.current.click()} className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer "/>
                <input 
                ref={imagePick} 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={addImageToPost}
                />
                <button 
                disabled={!tweet.trim() || !selectedFile || postLoading || imageUploading}
                onClick={handleSubmit}
                className="bg-blue-400 px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Post</button>
            </div>
        </div>
    </section>
  )
}
