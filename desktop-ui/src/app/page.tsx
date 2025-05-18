'use client'

import { useEffect, useState } from 'react'
import EmployeeDashboard from '@/app/dashboard/page'
import LoginPage from '@/app/login/page'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setIsAuthenticated(false)
        return
      }

      try {
        const response = await fetch('/api/validate-token', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setIsAuthenticated(response.ok)
      } catch (error) {
        console.error('Token validation failed:', error)
        setIsAuthenticated(false)
      }
    }

    checkTokenValidity()
  }, [])

  if (isAuthenticated === null) {
    return <p className="text-white text-center mt-20">Loading...</p>
  }

  return isAuthenticated ? <EmployeeDashboard /> : <LoginPage />
}
