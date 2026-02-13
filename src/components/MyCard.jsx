import React from 'react'
import appwriteServices from '../appwrite/conf.js'
import { Link } from 'react-router'

function MyCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-amber-300 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
        <img src={appwriteServices.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
      </div>
      <h2 className='text-xl font-bold'>{title}</h2>
      </div>
      
    </Link>
    
  )
}

export default MyCard
