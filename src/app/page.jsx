'use client'

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
    router.push('/home')
  }, [])

  return <></>
}
