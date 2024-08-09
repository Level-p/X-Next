/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import Icons from "./Icons";


export default function Post({post, id}) {
  return (
    <div className="flex p-3 border-b border-gray-200 dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
        <Image 
        src={post.profileImg} 
        alt="user-image" 
        height={40} 
        width={40}
        className="rounded-full h-11 w-11 mr-4" />
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="text-sm font-bold truncate">{post?.name}</h4>
                    <span className="text-xs truncate">@{post?.username}</span>
                </div>
                <HiDotsHorizontal className="text-sm"/>
            </div>

            <Link href={`/posts/${id}`}>
                <p className="text-gray-800 dark:text-gray-200 text-sm my-3">{post?.tweet}</p>
            </Link>
            <Link href={`posts/${id}`}>
                <img src={post?.image} className="rounded-2xl mr-2" alt=""/>
            </Link>

            <Icons id={id} postId={post.uid} deleteImg={post.image} post={post}/>
        </div>
    </div>
  )
}
