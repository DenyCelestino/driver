'use client'

import Anchor from '@/components/Universal/Anchor/anchor'
import { useMyContext } from '@/context/Context'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const { modalInstall, setModalInstall } = useMyContext()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installed, setInstalled] = useState(true)
  let isiOS = false // Inicialize a variável isiOS

  if (typeof window !== 'undefined') {
    isiOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

    // Resto do seu código que depende de 'navigator'
  }
  useEffect(() => {
    const handleBeforeInstallPrompt = event => {
      // Armazena o evento para ser usado posteriormente
      event.preventDefault()

      setInstalled(false)
      setDeferredPrompt(event)
    }

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt
    )

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Inicia a instalação
      deferredPrompt.prompt()

      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('O usuário aceitou a instalação da PWA')
        } else {
          console.log('O usuário cancelou a instalação da PWA')
        }

        // Limpa o evento para que não possa ser usado novamente
        setDeferredPrompt(null)
      })
    }
  }
  return (
    <div className="flex items-center bg-zinc-50 justify-center min-h-screen text-xs md:text-base">
      <div className="wrapper flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl">LOGO</h1>
        <p className="text-xs md:text-base w-10/12 md:w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Itaque, hic quia ea animi et mollitia earum ipsa enim,
        </p>
        <p className="text-xs md:text-base w-10/12 md:w-full">
          adipisci accusamus consequatur? Aspernatur doloribus velit
          aperiam, deserunt laboriosam excepturi pariatur debitis?
        </p>

        <div className="mt-9">
          <Anchor route="/free" title="Make a test" />
        </div>
        <div className="mt-9">
          <Link href={'/signup'} className="text-zinc-500 underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}
