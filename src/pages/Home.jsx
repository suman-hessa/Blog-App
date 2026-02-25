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
    <Container>
      <h1 className='text-3xl text-center py-8 uppercase font-semibold'>{isLoggedIn? "No posts available": "login to read posts"}</h1>
    </Container>
  ) 
 }
 else{
  return(
    <div className='w-full py-8'>
      <Container>
        {
          isLoggedIn?
          (<div className='flex flex-wrap gap-4'>
          {activePosts.map((post)=>(
          <div key={post.$id} className='p-2 w-1/4'>
            <MyCard {...post}/>
          </div>
         ))}
        </div>)
        : <div className='w-full bg-blue-300 p-4 text-3xl text-bold'>Login to read posts</div>
      }
    </Container>
    </div>
  )
 }
}

export default Home
