import React from "react";
import { X } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useSelector } from "react-redux";
import {LogoutBtn, Logo} from "./index.js";

export default function MobileNav({ navItems, clickFun, Menu, setMenu}) {
  const navigate = useNavigate()
  const authStatus = useSelector((state)=> state.auth.status)
  
  return (
    <div className="px-8 py-3 fixed inset-0 shadow bg-blue-200">
      <nav
        className={`h-17.5 flex justify-between`}>
          <div>
            <Link to="/">
              <Logo width='70px'/>
            </Link>
          </div>
          <X
           size={32}
           className={`hover:text-purple-500 cursor-pointer lg:hidden`}
           onClick={()=> clickFun()}
           />
        </nav>
        <div className={`${Menu && "left-0"} -left-full transition-left ease-out duration-200 mt-6 lg:hidden flex flex-col text-center items-center`}>
          <ul className={`gap-6 items-center`}>
            {navItems.map((item)=>(
              item.active? <li key={item.name}>
                <button
                  className='cursor-pointer hover:bg-purple-200 text-lg font-medium w-'
                  onClick={()=>(
                     setMenu(false),
                     navigate(item.slug)
                    )}
                >{item.name}</button>
              </li>: null
            ))}
          </ul>
          {
              authStatus && 
              <div className="ursor-pointer hover:text-purple-500 text-lg font-medium"> 
                <LogoutBtn />
              </div>   
            }
        </div>
        
    </div>
  );
}
