import React, { useState } from 'react'
import authServices from '../appwrite/auth.js'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import {login as storeLogin} from '../store/authSlice.js'
import {Input, Button, Logo, Container} from '../components/index.js'
import { useDispatch } from 'react-redux'

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    const signup = async (data)=>{
        console.log(data);
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
        }
    }

  return (
    <Container>
        <div className='w-full justify-center items-center'>
            <div className={`w-full mx-auto max-w-lg p-10 rounded-lg bg-gray-200`}>
                <div className='flex justify-center'>
                    <span className='inline-block mb-2'>
                        <Logo width='100%'/>
                    </span>
                </div>
                <h1 className='text-center font-medium text-xl leading-tight'>Sign Up to create account</h1>
                <p className='text-center text-base'>Already have an account? 
                    <Link
                    to="/login"
                    className='ml-1 text-blue-400 hover:underline'>
                     Sign In
                    </Link>
                </p>
                <form onSubmit={handleSubmit(signup)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {required: true})}
                        />
                        <Input
                         label="Email: "
                         placeholder="Enter your email"
                         {...register("email", {required: true})}
                        />
                        <Input 
                        label="Password: "
                        placeholder="Enter your password"
                        type='password'
                        {...register("password", {
                            required: true,
                            min: 8
                        })}
                        />
                        <Button
                        type='submit'
                        className='hover:bg-blue-400 duration-200'
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    </Container>
  )
}

export default SignUp
