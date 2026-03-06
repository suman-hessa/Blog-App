import React, { useEffect, useState } from 'react'
import appwriteServices from '../appwrite/conf.js'
import { Link } from 'react-router'

function MyCard({$id, title, featuredImage}) {
  const [img, setImg] = useState('')

  useEffect(()=>{
    const imageSrc = appwriteServices.getFilePreview(featuredImage);
    setImg(imageSrc);
  }, [featuredImage])
  return (
    <Link to={`/post/${$id}`}>
      <div className='bg-gray-300 p-4'>
          <div className='min-h-70 bg-cover rounded-lg mb-4'
           style={{
            backgroundImage:`url(${img})`,
            }}>
          </div>
      <h2 className='text-xl font-bold'>{title}</h2>
      </div>
      
    </Link>
    
  )
}

export default MyCard
