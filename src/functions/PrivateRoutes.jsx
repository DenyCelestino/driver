'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContextUser } from '@/context/ContextUser'

export default function PrivateRoutes({ children }) {
  const isLoggedIn = JSON.parse(localStorage.getItem('user'))
    ? true
    : false

  const router = useRouter()

  useEffect(() => {
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, router])

  return isLoggedIn ? children : null
}
