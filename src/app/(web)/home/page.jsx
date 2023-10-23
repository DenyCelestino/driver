'use client'

import Anchor from '@/components/Universal/Anchor/anchor'
import Button from '@/components/Universal/Button/button'
import { useMyContext } from '@/context/Context'
import Image from 'next/image'
import Link from 'next/link'
import LOGO from '../../../../public/icon-192x192.png'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const { modalInstall, setModalInstall } = useMyContext()
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [iosInstalled, setIosInstalled] = useState(false)
  const [androidInstalled, setAndroidInstalled] = useState(false)
  let isiOS = false // Inicialize a variável isiOS

  if (typeof window !== 'undefined') {
    isiOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

    // Resto do seu código que depende de 'navigator'
  }
  useEffect(() => {
    if (
      'standalone' in window.navigator &&
      window.navigator.standalone
    ) {
      setIosInstalled(true)
      console.log('ios installed')
      // A PWA está instalada no dispositivo iOS (Safari).
    } else {
      console.log('ios not installed')

      setIosInstalled(false)
      // A PWA não está instalada no dispositivo iOS.
    }
    if (window.navigator.getInstalledRelatedApps) {
      window.navigator
        .getInstalledRelatedApps()
        .then(relatedApps => {
          if (relatedApps.length > 0) {
            setAndroidInstalled(true)
            console.log('Android installed')

            // A PWA está instalada no dispositivo Android.
          } else {
            console.log('Android not installed')

            setAndroidInstalled(false)
            // A PWA não está instalada no dispositivo Android.
          }
        })
        .catch(error => {
          console.error(
            'Erro ao verificar as apps relacionadas:',
            error
          )
        })
    } else {
      // A propriedade getInstalledRelatedApps não é suportada no navegador.
    }

    const handleBeforeInstallPrompt = event => {
      // Armazena o evento para ser usado posteriormente
      event.preventDefault()
      console.log(event)
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
      {(!iosInstalled || !androidInstalled) && (
        <>
          {modalInstall && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 200 }}
                transition={{ duration: 0.8 }}
                className="bg-white shadow-2xl p-4 rounded-lg fixed bottom-0 left-0 right-0  z-20 flex items-center gap-4 text-xs md:text-base"
              >
                <div className="h-10 w-10">
                  <Image
                    className="h-full w-full"
                    src={LOGO}
                    alt="logo"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Instale o driver no seu disposito.</span>
                  <div className="flex flex-col gap-2">
                    {isiOS ? (
                      <div>
                        <p>
                          Adicione este aplicativo à sua tela inicial:
                        </p>
                        <p>
                          1. Toque no ícone de compartilhamento no
                          navegador.
                        </p>
                        <p>2. Selecione Adicionar à Tela Inicial.</p>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={handleInstallClick}
                          className="py-2 px-4 rounded bg-green-400 text-white"
                        >
                          Instalar agora
                        </button>
                      </div>
                    )}

                    <div>
                      <button
                        onClick={() => setModalInstall(!modalInstall)}
                        className="py-2 px-4 rounded bg-transparent"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </>
      )}

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
          <Anchor route="/login" title="Make a test" />
        </div>
        <div className="mt-9">
          <Link href={'#'} className="text-zinc-500 underline">
            Signup
          </Link>
        </div>

        <div className="fixed bottom-2 right-4">
          <Button title="Dowload app" />
        </div>
      </div>
    </div>
  )
}
