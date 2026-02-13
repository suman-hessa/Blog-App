import { useEffect, useState } from "react";
import config from "./config/config.js";
import { useDispatch } from "react-redux";
import authServices from "./appwrite/auth.js";
import {login, logout} from './store/authSlice.js'
import { Footer, Header } from "./components/index.js";
import { Outlet } from "react-router";


function App() {
   const[loading, setLoading] = useState(true);
   const dispatch = useDispatch()

   useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData})); // update the userData state with userInfo if the user is loggedIn
      }else{
        dispatch(logout()) // set the status to false if getCurrentUser returns null
      }
    })
    .finally(()=> setLoading(false)); // set the loading to false when whole database call have ended.
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
