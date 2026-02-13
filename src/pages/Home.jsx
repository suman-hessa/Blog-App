import React, {useCallback, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Container, MyCard, Postcard } from '../components'
import appwriteServices from '../appwrite/conf.js'


function Home() {
  const [posts, setPosts] = useState([]);
  const isLoggedIn = useSelector((state)=>state.auth.status)

  useEffect(()=>{
    appwriteServices.getPosts().then((posts)=>{
      if(posts){
        console.log(posts.rows);
        setPosts(posts.rows)
      }
    }).catch((err)=>console.log("useEffect error", err));
  }, [])

  if(posts.length == 0){
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
      <div className='flex flex-wrap gap-4'>
        {posts.map((post)=>(
          <div key={post.$id} className='p-2 w-1/4'>
            <MyCard {...post}/>
          </div>
        ))}
      </div>
    </Container>
    </div>
    
  )
 }
}

export default Home
