"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { signIn, signOut } from 'next-auth/react'



const LoginForm = () => {
    // const { toast } = useToast()
    const router = useRouter()

    const [load, setLoad] = useState(false)
    const [error, setError] = useState("")
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoad(true)
        const email = e.target[0].value
        const password = e.target[1].value
        if (!email || !password) {
            setError("Fill all Fields")
            setLoad(false)
            return
        }
        try {
            const res = await axios.post("/api/auth/signin", { email, password })
            if (!res.data.status) {
                setError(res.data.message)
                setLoad(false)
            }
            console.log(res.data)
            setLoad(false)
            router.replace("/dashboard")

        } catch (error: any) {
            setError(error.message)
            setLoad(false)
        }
    }
    return (
        <div className='flex justify-center place-items-center h-screen '>
            <form onSubmit={handleSubmit} className='border border-t-2 border-0 rounded-lg  border-blue-600 py-4 px-8 lg:w-1/3  shadow-xl bg-slate-200'>
                <h1 className='font-bold text-xl '>Login Form</h1>
                <div className='flex flex-col gap-y-3 mt-5'>
                    <Input placeholder='Enter your Email' type='email' />
                    <Input placeholder='********' type='password' />
                </div>
                {error && <div className='mt-4'>
                    <h1 className='text-red-600'>{error}</h1>
                </div>}
                <Button className='mt-4 w-full bg-blue-600 hover:bg-blue-800' disabled={load ? true : false} type='submit'>{load ? "Logging" : "Login"}</Button>
                <div className='text-end text-sm mt-6'>
                    <p>Dont have an account? <Link href={"/signup"} className='underline'>Signup</Link></p>
                </div>
                <div className='flex flex-col justify-center text-center mt-5'>
                    <h1>OR</h1>
                    <div onClick={()=>{signIn("google")}} className='flex justify-center mt-3 cursor-pointer hover:bg-slate-300 lg:text-lg gap-x-2 px-4 py-2 border border-slate-600 rounded-lg'>
                        <Image src={"/Google.png"} alt='' width={30} height={20} />
                        <h1> Sign in with Google</h1>
                    </div>
                    <div onClick={()=>{signIn("github")}} className='flex text-white justify-center mt-3 cursor-pointer bg-slate-800 hover:bg-slate-700 lg:text-lg gap-x-2 px-4 py-2 border border-slate-600 rounded-lg'>
                        <Image src={"/github.png"} alt='' width={30} height={20} />
                        <h1> Sign in with Github</h1>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm