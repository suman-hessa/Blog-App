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
    <div>
      <button
      className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer'
      onClick={logoutHandler}
      >logout</button>
    </div>
  )
}

export default LogoutBtn
