import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate ,Link } from 'react-router'
import {Container, Logo, LogoutBtn} from "../index.js"

function Header() {
  const authStatus = useSelector((state)=> state.auth.status);
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home", 
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    }, 
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus
    }, 
    {
      name: "Add Posts",
      slug: "/add-posts",
      active: authStatus
    }

  ]

  return (
    <header className='py-3 shadow bg-blue-300 h-17.5'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div>
            <Link to="/">
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex gap-4 items-center'>
            {navItems.map((item)=>(
              item.active? <li key={item.name}>
                <button
                  className='cursor-pointer hover:text-blue-500'
                  onClick={()=> navigate(item.slug)}
                >{item.name}</button>
              </li>: null
            ))}
            {
              authStatus && 
              <li> 
                <LogoutBtn />
              </li>   
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}


export default Header
