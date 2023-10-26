'use client'
import { useMyContext } from '@/context/Context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { ContextUser } from '@/context/ContextUser'

export default function Login() {
  const router = useRouter()

  const { ENDPOINT } = useMyContext()
  const { setLogged } = ContextUser()
  const [isLoading, setLoading] = useState(false)

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
                  setLogged(JSON.stringify(response.data.user))

                  router.push('/payment')
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
              setLogged(JSON.stringify(response.data.user))
              router.push('/payment')
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
      <div className="h-[40vh] md:h-[50vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl "></div>

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
          Connect with google
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
                className="text-base md:text-lg bg-transparent outline-none"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex items-center p-2 gap-2 bg-cinza-100">
              <div className="p-2 rounded bg-cinza-200" />
              <input
                className="text-base md:text-lg bg-transparent outline-none"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          {/* forgot password  */}
          <div className="flex items-center justify-between">
            <Link href={'#'} className="text-zinc-500 underline">
              Lost password
            </Link>

            <div className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </div>
          </div>

          {/* login button  */}
          <button className={`bg-cinza-100 py-2 px-4 rounded-lg`}>
            Login
          </button>
        </form>

        {/* signup  */}
        <div className="mt-9 flex items-center justify-center">
          <span>No account ?</span>
          <Link href={'#'} className="text-zinc-500 underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  )
}
