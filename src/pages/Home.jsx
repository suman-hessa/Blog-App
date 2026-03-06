import React, {useCallback, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Container, MyCard, Postcard } from '../components'

function Home() {
  const isLoggedIn = useSelector((state)=>state.auth.status)
  const posts = useSelector((state)=>state.post.posts)
  const [activePosts, setActivePosts] = useState([])

  useEffect(()=>{
    const activePosts = posts.filter((post)=>(
      post?.status === 'active'
    ))
    setActivePosts(activePosts)
  }, [posts])

  if(activePosts.length == 0){
  return (
      <h1 className='text-3xl text-center py-8 uppercase font-semibold'>{isLoggedIn? "No posts available": "login to read posts"}</h1>
  ) 
 }
 else{
  return(
    <div className='py-8 px-4 w-full'>
        {
          isLoggedIn?
          (<div className='border p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
          {activePosts.map((post)=>(
          <div key={post.$id} className=''>
            <MyCard {...post}/>
          </div>
         ))}
        </div>)
        : <div className='w-full bg-blue-300 p-4 text-3xl text-bold'>Login to read posts</div>
      }
    </div>
  )
 }
}

export default Home
