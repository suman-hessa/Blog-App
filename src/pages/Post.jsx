import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import appwriteServices from '../appwrite/conf.js'
import { Button, Container } from '../components/index.js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import parse from 'html-react-parser'

function Post() {
  const params = useParams()
  const [post, setPost] = useState([])
  const[error, setError] = useState("")
  const [img, setImg] = useState(null)
  const navigate = useNavigate()
  const userData = useSelector((state)=>state.auth.userData);

  useEffect(()=>{
    try {
      appwriteServices.getPost(params.slug).then((post)=>{
        if(post){
          const result = appwriteServices.getFilePreview(post.featuredImage);
          setImg(result);
          setPost(post)
        }
      })
    } catch (error) {
      setError(error.msg);
    }
  }, [params]);

  const deletePost = async ()=>{
    const deletedPost = await appwriteServices.deletePost(post.$id);
    if(deletedPost){
      const deletedFile = await appwriteServices.deleteFile(post.
        featuredImage)
        if(deletedFile){
          navigate("/")
        }
    }
  }

  const editPost = async ()=>{
    navigate(`/edit-post/${post.$id}`)
  }
  
  return (
   <Container className='relative py-8'>
    {userData.$id == post.userId && 
    <div className='flex absolute top-10 right-10 gap-4'>
      <Button className='bg-green-300 hover:bg-green-400 duration-200 cursor-pointer' onClick={editPost}>Edit</Button>
      <Button className='bg-red-300 hover:bg-red-400 duration-200 cursor-pointer' onClick={deletePost}>Delete</Button>
    </div>
    }
        <div className='w-full py-8'>
      <img src={img} alt={post.title} className='rounded-xl' />
    </div>
    <div className='w-full flex flex-col gap-5'>
      <h1 className='text-2xl'>{post.title}</h1>
      <h1 className='text-2xl'>{parse(String(post.content))}</h1>
    </div>
   </Container>
  )

}
export default Post
