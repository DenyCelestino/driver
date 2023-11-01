'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'

export default function PrivateRoutes({ children }) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = JSON.parse(Cookies.get('user')) ? true : false

    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [router])

  return children
}
