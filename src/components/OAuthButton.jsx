import React, { Children } from 'react'

export default function OAuthButton({onClickHandler, logo, children}) {
  return (
    <button
         onClick={onClickHandler}
         className='border mt-3 capitalize flex items-center font-medium w-full justify-center rounded-sm cursor-pointer box-border border-gray-400 hover:border-gray-700 hover:bg-gray-300'
        ><span className='size-13 flex items-center'><img src={logo} alt=""/></span>
            {children}</button>
  )
}

