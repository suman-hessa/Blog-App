import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteServices from '../appwrite/conf.js'
import { MyCard } from '../components/index.js';

export default function MyPosts() {
  const userData = useSelector((state)=> state.auth.userData);
  const allPosts = useSelector((state)=>state.post.posts);
  const[myPosts, setMyPosts] = useState([]);

  useEffect(()=>{
    const posts = allPosts.filter((post)=>(
      post?.userId === userData?.$id
    ))
    setMyPosts(posts);
  }, [allPosts])

  if(myPosts.length == 0){
    return (<h1 className='py-8 text-3xl text-center bg-yellow-300'>No posts available</h1>)
  }else{
      return (
    <div className='w-full flex flex-wrap gap-4 py-8'>
      {myPosts.map((post)=>(
        <div key={post.$id} className='w-1/4'>
          <MyCard {...post} />
        </div>
      ))}
    </div>
  )
  }
}
