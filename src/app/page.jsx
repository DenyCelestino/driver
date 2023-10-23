'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Main() {
  const router = useRouter()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then(registration => {
          console.log(
            'Service worker registered successfully. Scope:',
            registration.scope
          )
        })
        .catch(error => {
          console.error('Service worker registration failed:', error)
        })
    }
    router.push('/home')
  }, [])

  return <></>
}
