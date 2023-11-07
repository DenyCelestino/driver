'use client'

import Header from '@/components/App/Dashboard/Header'
import Anchor from '@/components/Universal/Anchor/anchor'
import Input from '@/components/Universal/Inputs/input'
import { ContextUser } from '@/context/ContextUser'
import PrivateRoutes from '@/functions/PrivateRoutes'
import Cookies from 'js-cookie'
import { PencilLine } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DotLoader } from 'react-spinners'
import PERSON from '../../../../public/person.png'
import Image from 'next/image'

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
    <PrivateRoutes redirect={false}>
      <div className="profile">
        <div className="wrapper">
          <Header App={true} time={bypass} />

          <div className="avatar-container">
            <div className="avatar">
              <Image
                src={PERSON}
                height={100}
                width={100}
                alt="avatar"
              />

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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                  placeholder="*****"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
                <PencilLine />
              </div>
            </div>
            <div className="profile-inputs">
              <span>Confirm Password</span>
              <div className="input">
                <input
                  disabled
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
    </PrivateRoutes>
  )
}
