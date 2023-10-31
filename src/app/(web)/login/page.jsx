'use client'
import { useMyContext } from '@/context/Context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { ContextUser } from '@/context/ContextUser'
import { DotLoader } from 'react-spinners'

export default function Login() {
  const router = useRouter()

  const { ENDPOINT } = useMyContext()
  const { setCookies } = ContextUser()
  const [isLoading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        router.push('/payment')
        setCookies(res.data.user)
        localStorage.setItem('user', JSON.stringify(res.data.user))
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
                  localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                  )

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
              localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
              )

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
    <div className="flex flex-col gap-10">
      <div className="h-[40vh] md:h-[30vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl "></div>

      <div className="wrapper flex flex-col gap-4 text-xs md:text-base">
        <div className="p-1 bg-cinza-100 w-1/3 flex items-center justify-center rounded">
          <h1 className="text-xl md:text-3xl">LOGO</h1>
        </div>

        <div>
          <p className="text-xs md:text-base w-10/12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
          <p className="text-xs md:text-base w-10/12">
            Accusamus aut, culpa veritatis explicabo sunt.
          </p>
        </div>
        <button
          onClick={login}
          className={`bg-cinza-100 py-2 px-4 rounded-lg`}
        >
          Entrar com google
        </button>

        {/* others login  */}
        <div className="flex items-center justify-between">
          <div className="h-1 bg-cinza-100 w-1/3" />
          <span className="text-xs md:text-base">OR</span>
          <div className="h-1 bg-cinza-100 w-1/3" />
        </div>

        {/* input container  */}

        <form
          onSubmit={e => signin(e)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center p-2 gap-2 bg-cinza-100">
              <div className="p-2 rounded bg-cinza-200" />
              <input
                className="text-base md:text-lg bg-transparent outline-none w-full"
                type="email"
                placeholder="Email"
                required
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex items-center p-2 gap-2 bg-cinza-100">
              <div className="p-2 rounded bg-cinza-200" />
              <input
                className="text-base md:text-lg bg-transparent outline-none w-full"
                type="password"
                placeholder="Password"
                required
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </div>

          {/* forgot password  */}
          <div className="flex items-center justify-between">
            <Link href={'#'} className="text-zinc-500 underline">
              Lost password
            </Link>

            {/* <div className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </div> */}
          </div>

          {/* login button  */}
          <button
            className={`bg-cinza-100 py-2 px-4 rounded-lg flex items-center justify-center`}
          >
            {isLoading ? (
              <DotLoader size={20} color="#DC4266" />
            ) : (
              'Iniciar sessão'
            )}
          </button>
        </form>

        {/* signup  */}
        <div className="mt-9 flex items-center justify-center">
          <span>No account ?</span>
          <Link href={'/signup'} className="text-zinc-500 underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}
