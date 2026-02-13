import React from 'react'

function Button({
    children,
    type="Button",
    bgColor="bg-blue-300",
    textColor="text-white",
    className="",
    ...props
}) {
  return (
    <button 
    className={`px-4 py-2 rounded-xl cursor-pointer w-full ${className} ${bgColor} ${textColor}`}
    type={type}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button
