import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useParams, useSearchParams } from 'react-router'
import appwriteServices from '../appwrite/conf.js'

function EditPosts() {
  const params = useParams()
  const [post, setPost] = useState([])
  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    appwriteServices.getPost(params.slug).then((post)=>{
      if(post){
        setPost(post);
        setLoader(false);
      }
    })
  }, [])

  return(
    <Container>
      {loader? <h1>Loading...</h1>: <PostForm post={post}/>}
    </Container>
    
  )

}

export default EditPosts
