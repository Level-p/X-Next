"use client"
import { editProfile, profileState } from "@/atom/modelAtom";
import { app } from "@/firebase";
import {  doc, getFirestore, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { HiX, HiCamera } from "react-icons/hi";
import Modal from "react-modal"

export default function ProfileModal() {
    const {data: session} = useSession()
    const [open, setOpen] = useRecoilState(editProfile)
    const [profileStateData, setprofileStateData] = useRecoilState(profileState)
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageUploading, setimageUploading] = useState(false)
    const [bioIspresent,  setBioIspresent] = useState(false)
    const [imageIsPresent,  setimageIsPresent] = useState(false)
    const filePicker = useRef(null)
    const [postUploading, setPostUploading] = useState(false)
    const [bio, setBio] = useState('')
    const [imageFileUrl, setImageFileUrl] = useState(session?.user?.image)
    const db = getFirestore(app)
    const data = [profileStateData]

    const addImageToPost = (e) => {
        const file = e.target.files[0]
        if(file) {
          setSelectedFile(file)
          setImageFileUrl(URL.createObjectURL(file))
        }
      }


    async function uploadImageToFirestore() {
        setimageUploading(true)
        const storage = getStorage(app)
        const filename = "Profile" + new Date().getTime() + '-' + selectedFile.name
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, selectedFile)
        uploadTask.on(
            'state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                setSelectedFile(null)
                setimageUploading(false)
                setImageFileUrl(null)
                console.error(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                    setImageFileUrl(downloadURL)
                    setimageUploading(false)
                })
            }
        )
    } 

    async function onClick(id) {
        setPostUploading(true)
        if(!bioIspresent || imageIsPresent) {
            await updateDoc(doc(db, 'profile', id), {
                bio,
            })
        } else if(!bioIspresent && !imageIsPresent){
            await setDoc(doc(db, "profile", session.user.uid) , {
                bio: bio || '',
                name: session.user.name,
                profileImage: imageFileUrl,
                uid: session.user.uid,
                username: session.user.username,
                timestamp: serverTimestamp()
            })
        }
        setPostUploading(false)
        setSelectedFile(null)
        setBio('')
        setOpen(false)
    }
    
    useEffect(() => {
        setBioIspresent(data.findIndex(prof => prof.bio === bio) !== -1)
        setimageIsPresent(data.findIndex(prof => prof.profileImage === imageFileUrl) !== -1)

        if(selectedFile) {
            uploadImageToFirestore()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile])

  return (
    <div>
           {
        open && 
        <Modal
        className="max-w-xl w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-800 rounded-xl shadow-md focus:outline-none" 
        onRequestClose={() => setOpen(false)}
        ariaHideApp={false}
        isOpen={open
        }>
            <div className="p-4">
                    <div className="py-2 px-1 5">
                        <HiX className="text-2xl p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full cursor-pointer" onClick={() => setOpen(false)}/>
                    </div>

                    <div className="flex flex-col border-b border-gray-200 rounded-md">
                    {
                                selectedFile ? (
                                  <Image
                                  src={imageFileUrl}
                                  alt="Image"
                                  width={40}
                                  height={40}
                                  className={`max-h-[200px] w-full cursor-pointer object-contain ${imageUploading ? 'animate-pulse' : ''}` }
                                  onClick={() => setSelectedFile(null)}
                                  />
                                ) : (
                                  <div className="flex justify-center">
                                    <HiCamera onClick={() => filePicker.current.click()} className='text-5xl cursor-pointer text-gray-400 dark:text-gray-50'/>
                                    <input ref={filePicker} type="file" id="file" accept='image/*' className='hidden' onChange={addImageToPost}/>
                                  </div>
                                )
                     }
                     <textarea rows={2} cols={2} className="w-full border-none tracking-wide min-h-[50px] text-lg p-1 placeholder:text-gray-400 dark:bg-slate-600 outline-none" value={bio} onChange={e => setBio(e.target.value)} placeholder={profileStateData.bio || "Hello guy's, I am new on X"} ></textarea>
                    <button 
                    disabled={postUploading || imageUploading}
                    onClick={(e) => {
                        e.preventDefault()
                        onClick(profileStateData)
                    }}
                    className="bg-blue-400 px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50 w-full">
                        Done
                    </button>
                    </div>
            </div>
        </Modal>
    }
    </div>
  )
}
