import React, {useState} from 'react'
import {Button, Input, Logo, OAuthButton} from './index.js'
import { Link, useNavigate } from 'react-router'
import authServices from '../appwrite/auth.js'
import {login as storeLogin} from '../store/authSlice.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import googlePng from '../../public/googleLogo.png?url'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data)=>{
        setError("")
        try {
            const session = await authServices.login(data);
            if(session){
                const userData = await authServices.getCurrentUser()
                if(userData) {
                    dispatch(storeLogin({userData}))
                    navigate("/")   
                }
            }
        } catch (error) {
            setError(error.message);        
        }
    }

    const loginWithGoogle = async ()=>{
        setError("")
        try {
            const googleSession = await authServices.loginWithGoogle()
            if(googleSession){
                const userData = await authServices.getCurrentUser()
                if(userData){
                    dispatch(storeLogin({userData}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full shadow-2xs'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-sm p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign In to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-400"
                    >
                        Sign Up
                    </Link>
        </p>
        {/* google-login */}
        <OAuthButton onClickHandler={loginWithGoogle} logo={googlePng}>continue with google</OAuthButton>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <div className='text-center mt-1 text-gray-500'>or</div>
        <form onSubmit={handleSubmit(login)} className='mt-2'>
            <div className='space-y-5'>
                <Input
                label="Email "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                bgColor='bg-blue-400'
                className="w-full hover:bg-blue-500"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login
