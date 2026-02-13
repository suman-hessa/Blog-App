import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

export default function Protected({children, authentication=true}) {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate()
    const authStatus = useSelector((state)=>state.auth.status);

    useEffect(()=>{
        if (authentication==true && authStatus!==authentication) {
            navigate("/login");
        } else if(authentication==false && authStatus!==authentication){
            navigate("/");
        }
        setLoader(false);
    }, [navigate, authStatus, authentication])

  return loader? <div>Loading...</div> : <>{children}</>;
}

