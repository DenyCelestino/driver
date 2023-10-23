'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Main() {
  const router = useRouter()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log(
              'Service Worker registrado com sucesso:',
              registration
            )
          })
          .catch(error => {
            console.error(
              'Erro ao registrar o Service Worker:',
              error
            )
          })
      })
    }
    router.push('/home')
  }, [])

  return <></>
}
