"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import axios from "axios"
import { useRouter } from 'next/navigation'

const SignupForm = () => {
    const router = useRouter()
    const [load, setLoad] = useState(false)
    const [error, setError] = useState("")
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoad(true)
        const name = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        try {
            const res = await axios.post("/api/auth/register", { name, email, password })

            if (!res.data.status) {
                setError(res.data.message)
                setLoad(false)
                return
            }
            console.log(res.data)
            const form = e.target
            form.reset()
            setLoad(false)
            router.push("/")
        } catch (error) {
            setLoad(false)
            setError("Something went Wrong")
        }
    }
    return (
        <div className='flex justify-center place-items-center h-screen '>
            <form onSubmit={handleSubmit} className='border border-t-2 border-0 rounded-lg p-5 border-blue-600 lg:w-1/3 px-10 shadow-xl bg-slate-200'>
                <h1 className='font-bold text-xl '>Signup Form</h1>
                <div className='flex flex-col gap-y-3 mt-5'>
                    <Input placeholder='Enter your Full Name' type='text' />
                    <Input placeholder='Enter your Email' type='email' />
                    <Input placeholder='********' type='password' />
                </div>
                {error && <div className='my-4'>
                    <h1 className='text-red-600'>{error}</h1>
                </div>}
                <Button className='mt-4 w-full bg-blue-600 hover:bg-blue-800' disabled={load ? true : false} type='submit'>{load ? "Signing" : "Signup"}</Button>
                <div className='text-end text-sm mt-6'>
                    <p>Already have an account? <Link href={"/"} className='underline'>Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignupForm