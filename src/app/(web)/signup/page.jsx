'use client'
import { useMyContext } from '@/context/Context'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { DotLoader } from 'react-spinners'
import Image from 'next/image'
import LOGO from '../../../../public/logo.svg'
import { useRouter } from 'next/navigation'
import { ContextUser } from '@/context/ContextUser'

export default function Signup() {
  const { ENDPOINT } = useMyContext()
  const { setCookies } = ContextUser()
  const [isLoading, setLoading] = useState(false)
  const [res, setRes] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [number, setNumber] = useState('')

  const router = useRouter()

  const signup = async e => {
    e.preventDefault()

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
          const userLogged = JSON.stringify(res.data.user)
          setCookies(userLogged)
          router.push('/dashboard')
        } else {
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="login">
      <div className="wrapper">
        <Image className="logo" src={LOGO} alt="Logo" />

        <div className="login-form">
          <form onSubmit={e => signup(e)} className="fill-container">
            <div className="login-inputs">
              <span>Nome</span>
              <input
                placeholder="John Doe"
                type="text"
                required
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
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
              <span>Telefone</span>
              <input
                type="number"
                placeholder="Celular (+258)"
                required
                onChange={e => setNumber(e.target.value)}
                value={number}
              />
            </div>
            <div className="login-inputs">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                required
                onChange={e => setPassowrd(e.target.value)}
                value={password}
              />
            </div>
            <div className="login-inputs">
              <span>Confirmar password</span>
              <input
                type="password"
                placeholder="Confirme seu password"
                required
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <div className="login-button-container">
              <button disabled={isLoading}>
                {isLoading ? (
                  <DotLoader size={20} color="#FFF" />
                ) : (
                  'Criar conta'
                )}
              </button>
            </div>

            <span className="login-signup">
              Tenho uma conta, <Link href={'/login'}>Entrar</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}
