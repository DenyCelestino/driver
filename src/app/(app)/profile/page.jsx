'use client'

import Header from '@/components/App/Dashboard/Header'
import Anchor from '@/components/Universal/Anchor/anchor'
import Input from '@/components/Universal/Inputs/input'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'
import { PencilLine } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DotLoader } from 'react-spinners'

export default function Profile() {
  const getUserCookie = Cookies.get('user')
  const user = getUserCookie ? JSON.parse(getUserCookie) : {}

  const [name, setName] = useState(user.name ? user.name : '')
  const [birthday, setBirthday] = useState('')
  const [number, setNumber] = useState(user.number ? user.number : '')
  const [email, setEmail] = useState(user.email ? user.email : '')
  const [password, setPassword] = useState('growskills')

  const [isLoading, setLoading] = useState(false)

  const { bypass } = ContextUser()

  return (
    <div className="profile">
      <div className="wrapper">
        <Header App={true} time={bypass} />

        <div className="avatar-container">
          <div className="avatar">
            <img src="https://media.licdn.com/dms/image/D4E03AQGjDromGcPp6A/profile-displayphoto-shrink_200_200/0/1682194840630?e=1704326400&v=beta&t=iudDkWaGyPWNR0WoDlK3kK4_hsqIp_V0YJSYEOWGhTw" />

            <button className="avatar-edit">
              <PencilLine />
            </button>
          </div>
        </div>

        <form onSubmit={e => signin(e)} className="fill-container">
          <div className="profile-inputs">
            <span>Nome</span>
            <div className="input">
              <input
                placeholder="email@example.com"
                type="text"
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <PencilLine />
            </div>
          </div>
          <div className="profile-inputs">
            <span>Telefone</span>
            <div className="input">
              <input
                placeholder="+258 XX XX XX"
                type="number"
                onChange={e => setNumber(e.target.value)}
                value={number}
              />
              <PencilLine />
            </div>
          </div>
          <div className="profile-inputs">
            <span>Email</span>
            <div className="input">
              <input
                placeholder="+258 XX XX XX"
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <PencilLine />
            </div>
          </div>
          <div className="profile-inputs">
            <span>Password</span>
            <div className="input">
              <input
                placeholder="*****"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
              <PencilLine />
            </div>
          </div>

          <div className="profile-button-container">
            <button>
              {isLoading ? (
                <DotLoader size={20} color="#FFF" />
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
