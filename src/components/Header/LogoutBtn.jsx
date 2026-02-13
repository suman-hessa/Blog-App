import React from 'react'
import {useDispatch } from 'react-redux'
import {logout} from '../../store/authSlice.js'
import authServices from '../../appwrite/auth.js' 

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authServices.logout().then(()=>dispatch(logout()));
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
