'use client'
import { useMyContext } from '@/context/Context'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Modal from '@/components/Universal/Modal/Modal'
import Lottie from 'lottie-react'
import EMAIl from '../../../../public/animations/email.json'
import { DotLoader } from 'react-spinners'

export default function Signup() {
  const { ENDPOINT } = useMyContext()
  const [isLoading, setLoading] = useState(false)
  const [res, setRes] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [number, setNumber] = useState('')

  const signup = async e => {
    e.preventDefault()
    console.log('here')
    if (confirmPassword != password) {
      toast.error('As senhas devem ser iguais')
    } else if (password.length < 8) {
      toast.error('A senha precisa ter no mínimo 8 caracteres')
    } else if (number.length < 9 || number.length > 9) {
      toast.error('Please enter a valid phone number')
    } else {
      try {
        setLoading(true)
        const res = await axios.post(
          `${ENDPOINT}signup.php`,
          JSON.stringify({
            name: name,
            email: email,
            password: password,
            number: number
          })
        )
        console.log(res)
        setLoading(false)

        if (res.data.status == 200) {
          toast.success(res.data.message)
          setRes(true)
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="h-[40vh] md:h-[30vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl "></div>

      {res && (
        <Modal>
          <div className="flex flex-col items-center justify-center text-center text-xs md:text-base gap-4">
            <Lottie
              className="h-40 w-40"
              animationData={EMAIl}
              loop={true}
            />
            <p>
              Enviamos um email de confirmacão {email}, verifique e
              siga as instruções para terminar o cadastro...
            </p>

            <Link
              onClick={() => setRes(false)}
              className="p-2 bg-primary-200 text-zinc-50 rounded"
              href={'/login'}
            >
              Esta bem, vamos
            </Link>
          </div>
        </Modal>
      )}
      <div className="wrapper flex flex-col gap-4 text-xs md:text-base">
        {/* <div className="p-1 bg-cinza-100 w-1/3 flex items-center justify-center rounded">
          <h1 className="text-xl md:text-3xl">LOGO</h1>
        </div> */}

        <div>
          <p className="text-xs md:text-base w-10/12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
          <p className="text-xs md:text-base w-10/12">
            Accusamus aut, culpa veritatis explicabo sunt.
          </p>
        </div>

        {/* others login  */}
        {/* <div className="flex items-center justify-between">
          <div className="h-1 bg-cinza-100 w-1/3" />
          <span className="text-xs md:text-base">OR</span>
          <div className="h-1 bg-cinza-100 w-1/3" />
        </div> */}

        {/* input container  */}

        <form
          onSubmit={e => signup(e)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center p-2 gap-2 bg-cinza-100">
              <div className="p-2 rounded bg-cinza-200" />
              <input
                className="text-base md:text-lg bg-transparent outline-none w-full"
                type="text"
                placeholder="Nome"
                required
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
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
                type="number"
                placeholder="Celular (+258)"
                required
                onChange={e => setNumber(e.target.value)}
                value={number}
              />
            </div>
            <div className="flex items-center p-2 gap-2 bg-cinza-100">
              <div className="p-2 rounded bg-cinza-200" />
              <input
                className="text-base md:text-lg bg-transparent outline-none w-full"
                type="password"
                placeholder="Password"
                required
                onChange={e => setPassowrd(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex items-center p-2 gap-2 bg-cinza-100">
              <div className="p-2 rounded bg-cinza-200" />
              <input
                className="text-base md:text-lg bg-transparent outline-none w-full"
                type="password"
                placeholder="Confirme seu password"
                required
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>

          {/* login button  */}

          <button
            disabled={isLoading}
            className={`bg-cinza-100 py-2 px-4 rounded-lg flex justify-center items-center`}
          >
            {isLoading ? (
              <DotLoader size={20} color="#DC4266" />
            ) : (
              'Criar conta'
            )}
          </button>
        </form>

        {/* signup  */}
        <div className="mt-9 flex items-center justify-center">
          <span>Have a account ?</span>
          <Link href={'/login'} className="text-zinc-500 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
