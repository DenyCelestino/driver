'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'

export default function PrivateRoutes({ children }) {
  const router = useRouter()
  const getUserCookie = Cookies.get('user')

  const { bypass } = ContextUser()
  useEffect(() => {
    const isLoggedIn = getUserCookie ? true : false

    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.push('/login')
    }
    if (bypass.status != 200) {
      router.push('/payment')
    }
  }, [router])

  return children
}
