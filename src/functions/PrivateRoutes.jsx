'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContextUser } from '@/context/ContextUser'

export default function PrivateRoutes({ children }) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = JSON.parse(window.localStorage.getItem('user'))
      ? true
      : false

    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  return children
}
