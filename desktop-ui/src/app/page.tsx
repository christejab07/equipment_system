'use client'

import { useEffect, useState } from 'react'
import EmployeeDashboard from '@/app/dashboard/page'
import LoginPage from '@/app/login/page'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token) // for now, just checks existence
  }, [])

  if (isAuthenticated === null) return <p className="text-white text-center mt-20">Loading...</p>

  return isAuthenticated ? <EmployeeDashboard /> : <LoginPage />
}
