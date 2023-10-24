'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Main() {
  const router = useRouter()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(resp => {
          console.log('resp', resp)
        })
        .catch(err => {
          console.log('err', err)
        })
    } else {
      console.log('no service worker')
    }
    // router.push('/home')
  }, [])

  return (
    <div className="flex flex-col gap-2 items-center min-h-screen justify-center">
      <h1>This is a landing page</h1>
      <Link className="underline" href={'/home'}>
        Go to home page
      </Link>
    </div>
  )
}
