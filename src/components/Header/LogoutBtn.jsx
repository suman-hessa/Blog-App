import React from 'react'
import {useDispatch } from 'react-redux'
import {logout} from '../../store/authSlice.js'
import { deleteAllPosts } from '../../store/postSlice.js'
import authServices from '../../appwrite/auth.js' 
import { useNavigate } from 'react-router'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = ()=>{
        authServices.logout()
        .then(()=>dispatch(logout()))
        .then(()=>navigate("/"))
    }

  return (
      <button
      className='inline-bock px-6 py-2 duration-200 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer text-gray-100'
      onClick={logoutHandler}
      >logout</button>
  )
}

export default LogoutBtn
