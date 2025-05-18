'use client'

import Input from '@/components/Input'
import Button from '@/components/Button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${baseUrl}/users/login`, {
        email,
        password,
      })

      localStorage.setItem('token', res.data.token)
      toast.success('Login successful')
      router.push('/dashboard')
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    const message = err.response?.data?.message || err.message || 'Login failed.'
    console.error(message)
    toast.error(message)
  } else {
    console.error(err)
    toast.error('Something went wrong')
  }
}

  }

  return (
    <main className="min-h-[90vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-100 p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Input label="Email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input label="Password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Button type="submit" className="w-full mt-4">Login</Button>
      </form>
    </main>
  )
}
