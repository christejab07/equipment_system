'use client'

import { useEffect, useState } from 'react'
import EmployeeDashboard from '@/app/dashboard/page'
import LoginPage from '@/app/login/page'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token')

    // Set authentication status
    setIsAuthenticated(token !== null && token !== 'null' && token !== '')
  }, [])

  // Show loading state while authentication status is being determined
  if (isAuthenticated === null) {
    return <p className="text-white text-center mt-20">Loading...</p>
  }

  // Conditionally render the appropriate page
  return isAuthenticated ? <EmployeeDashboard /> : <LoginPage />
}
