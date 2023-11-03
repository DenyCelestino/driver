'use client'
import { useMyContext } from '@/context/Context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { ContextUser } from '@/context/ContextUser'
import { DotLoader } from 'react-spinners'
import LOGO from '../../../../public/logo.svg'
import GOOGLE from '../../../../public/google.svg'
import Image from 'next/image'

export default function Login() {
  const router = useRouter()
  const { ENDPOINT } = useMyContext()
  const { setCookies } = ContextUser()
  const [isLoading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
  const signin = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await axios.post(
        `${ENDPOINT}signin.php`,
        JSON.stringify({
          email: email,
          password: password
        })
      )
      setLoading(false)
      if (res.data.status == 200) {
        toast.success(res.data.message)
        router.push('/dashboard')
        setCookies(res.data.user)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const chekIfUserExists = async (email, google_id) => {
    setLoading(true)
    const res = await axios.post(
      `${ENDPOINT}login.php`,
      JSON.stringify({
        email: email,
        google_id: google_id
      })
    )
    setLoading(false)
    return res
  }
  const register = async (name, email, google_id, picture) => {
    setLoading(true)
    const res = await axios.post(
      `${ENDPOINT}register.php`,
      JSON.stringify({
        name: name,
        email: email,
        google_id: google_id,
        avatar: picture
      })
    )

    setLoading(false)
    return res
  }
  const login = useGoogleLogin({
    onSuccess: async response => {
      try {
        setLoading(true)
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`
            }
          }
        )

        // console.log(res)

        const checkLogin = chekIfUserExists(
          res.data.email,
          res.data.sub
        )
        setLoading(false)
        toast.promise(checkLogin, {
          loading: 'Processando...',
          success: response => {
            // console.log('first-console:' + response)
            if (response.data.status === 401) {
              setLoading(true)
              const completeRegister = register(
                res.data.name,
                res.data.email,
                res.data.sub,
                res.data.picture
              )
              toast.promise(completeRegister, {
                loading: 'Registando e Autenticando... ',
                success: response => {
                  setLoading(false)
                  setCookies(response.data.user)

                  router.push('/dashboard')
                  return `Autenticado(a) com sucesso, ${response.data.user.name}`
                },
                error: response => {
                  setLoading(false)
                  return 'Ocorreu um erro ao registrar o usuário'
                }
              })
            } else if (response.data.status == 200) {
              console.log(response.data)
              setLoading(false)
              setCookies(response.data.user)

              router.push('/dashboard')
              return `Autenticado(a) com sucesso, ${response.data.user.name}`
            }
          },
          error: 'Ocorreu um erro no processo'
        })
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
      }
    },
    onError: e => {
      console.log(e)
    }
  })

  return (
    <div className="login">
      <div className="wrapper">
        <Image className="logo" src={LOGO} alt="Logo" />

        <div className="login-form">
          <div className="login-inputs">
            <span>Iniciar com Google</span>
            <button onClick={login} className="google-button">
              <Image src={GOOGLE} alt="Logo" width={20} height={20} />
              Continuar com Google
            </button>
          </div>
          <form onSubmit={e => signin(e)} className="fill-container">
            <div className="login-inputs">
              <span>Email</span>
              <input
                placeholder="email@example.com"
                type="email"
                required
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="login-inputs">
              <span>Password</span>
              <input
                type="password"
                placeholder="*****"
                required
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="login-button-container">
              <button>
                {isLoading ? (
                  <DotLoader size={20} color="#FFF" />
                ) : (
                  'Entrar'
                )}
              </button>
            </div>

            <span className="login-signup">
              Não tenho uma conta,{' '}
              <Link href={'/signup'}>Criar conta</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}
