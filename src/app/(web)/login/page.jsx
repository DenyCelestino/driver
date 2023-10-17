'use client'
import Button from '@/components/Universal/Button/button'
import CustomToast from '@/components/Universal/Toasts/CustomToast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Login() {
  const router = useRouter()

  const signin = async e => {
    e.preventDefault()
    router.push('/profile')

    toast.custom(t => (
      <CustomToast
        t={t}
        message="Logged in successfully ✅"
        title="ConPro bot"
        buttontext="close"
        onClick={() => toast.dismiss(t.id)}
      />
    ))
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="h-[40vh] md:h-[50vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl"></div>

      <div className="wrapper flex flex-col gap-4">
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
          onClick={signin}
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
