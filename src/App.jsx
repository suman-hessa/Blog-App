import { useEffect, useState } from "react";
import config from "./config/config.js";
import { useDispatch } from "react-redux";
import authServices from "./appwrite/auth.js";
import {login, logout} from './store/authSlice.js'
import { addAllPosts } from "./store/postSlice.js";
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router";
import appwriteServices from "./appwrite/conf.js";
import { useSelector } from "react-redux";

function App() {
   const[loading, setLoading] = useState(true);
   const dispatch = useDispatch()

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      } 
        else{
          dispatch(logout())
        }
    })
  }, [])

    useEffect(()=>{
    appwriteServices.getPosts()
    .then((posts)=>{
      if(posts.rows.length > 0){
        console.log(posts.rows);
        dispatch(addAllPosts({allPosts: posts.rows}))
      }
    })
    .finally(()=>setLoading(false))
  }, [])
  

   // Conditional rendering 
   return !loading? (
      <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      </div>
   ): (null)
}
export default App
