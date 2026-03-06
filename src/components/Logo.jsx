import React from 'react'

function Logo({width = "100px"}) {
  return (
    <div className={`${width} text-purple-500 font-bold text-3xl`}>BlogPop</div>
  )
}

export default Logo
