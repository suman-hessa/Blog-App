import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate ,Link } from 'react-router'
import {Button, Container, Logo, LogoutBtn, MobileNav} from "../index.js"
import { Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state)=> state.auth.status);
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenu = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }

  const navItems = [
    {
      name: "Home", 
      slug: "/",
      active: true
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
    <nav className='w-full shadow-lg bg-white z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex h-17.5 items-center'>
          {/* logo */}
          <div className='shrink-0 font-bold text-2xl text-blue-500 mr-auto'>
            BlogPop
          </div>
          {/* desktop-menu */}
            <div className='hidden md:flex justify-between'>
              <ul className='flex items-center space-x-8'>
              {navItems.map((item)=>(
                item.active? <li key={item.name}>
                  <Link
                  to={item.slug}
                  className='text-gray-700 hover:text-blue-500 font-medium'
                  >{item.name}</Link>
                </li>:''
              ))}
              {
                authStatus? <li>
                  <LogoutBtn />
                </li>: <Button 
                className='inline-bock px-6 py-2 duration-200 bg-purple-500 hover:bg-purple-600 rounded-lg cursor-pointer text-gray-100'
                ><Link to={"/login"}>Login</Link></Button>
              }
            </ul>
            </div>
          {/* hamburger-button-mobile */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={handleMenu}
              className='cursor-pointer hover:text-blue-500 transition'
            >
              {isMenuOpen? <X size={32}/>: <Menu size={32} />}
            </button>
          </div>
        </div>
      {/* mobile-menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen? 'max-h-64 opacity-100': 'max-h-0 opacity-0'} overflow-hidden bg-gray-50`}>
        <ul className='flex flex-col p-4 space-y-2'>
          {navItems.map((item)=>(
          item.active? <li key={item.name}>
            <Link
             to={item.slug}
             onClick={handleMenu}
             className='block text-md px-2 py-4 text-gray-700 hover:bg-blue-100 transition rounded-lg'>
              {item.name}
            </Link>
          </li>:''
        ))}
        {
          authStatus ? <li>
            <LogoutBtn className={`inline-block`}/>
          </li>: <Button 
                onClick={()=>(
                  handleMenu(),
                  navigate('/login')
                )}
                className='inline px-6 py-2 duration-200 bg-purple-500 hover:bg-purple-600 rounded-lg cursor-pointer text-gray-100'
                >Login</Button>
        }
        </ul>
        
      </div>
      </div>
    </nav>
  )
}


export default Header
