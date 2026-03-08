import React, { useState } from 'react'
import authServices from '../appwrite/auth.js'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import {login as storeLogin} from '../store/authSlice.js'
import {Input, Button, Logo, Container, OAuthButton} from '../components/index.js'
import { useDispatch } from 'react-redux'
import googlePng from '../../public/googleLogo.png'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    const signup = async (data)=>{
        setError("")
        try {
            const account = await authServices.createAccount(data);
            if(account){
               const userData = await authServices.getCurrentUser();
               if(userData){
                dispatch(storeLogin(userData));
                navigate("/") // navigate to home page
               }
            }
        } catch (error) {
            setError(error.message);
            console.log("error: ", error.message)
        }
    }

  return (
        <div className='flex items-center justify-center w-full shadow-2xs'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-sm p-10 border border-black/10`}>
                <div className='flex justify-center'>
                    <span className='inline-block mb-2'>
                        <Logo width='100%'/>
                    </span>
                </div>
                <h1 className='text-center text-2xl font-bold leading-tight'>Sign Up to create account</h1>
                <p className='mt-2 text-center text-base text-black/60'>Already have an account?&nbsp; 
                    <Link
                    to="/login"
                    className='font-medium text-primary transition-all duration-200 hover:underline text-blue-400'>
                     Sign In
                    </Link>
                </p>
                {error && <p className="bg-red-500 mt-8 text-center">{error}</p>}
                <OAuthButton logo={googlePng} >continue with google</OAuthButton>
                <div className='text-center mt-2 text-gray-600'>or</div>
                <form onSubmit={handleSubmit(signup)} className='mt-2'>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name "
                        placeholder="Enter your full name"
                        {...register("name", {required: true})}
                        />
                        <Input
                         label="Email "
                         placeholder="Enter your email"
                         {...register("email", {required: true})}
                        />
                        <Input 
                        label="Password "
                        placeholder="Enter your password"
                        type='password'
                        {...register("password", {
                            required: true,
                            min: 8
                        })}
                        />
                        <Button
                        type='submit'
                        bgColor='bg-blue-500'
                        className='hover:bg-blue-600 duration-200 w-full'
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
  )
}

export default SignUp
