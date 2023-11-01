'use client'

import Anchor from '@/components/Universal/Anchor/anchor'
import Input from '@/components/Universal/Inputs/input'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function Profile() {
  // const objetoNoLocalStorage = JSON.parse(
  //   localStorage.getItem('user')
  // )
  const [name, setName] = useState(
    JSON.parse(Cookies.get('user')).name
      ? JSON.parse(Cookies.get('user')).name
      : ''
  )
  const [birthday, setBirthday] = useState('')
  const [number, setNumber] = useState(
    JSON.parse(Cookies.get('user')).number
      ? JSON.parse(Cookies.get('user')).number
      : ''
  )
  const [email, setEmail] = useState(
    JSON.parse(Cookies.get('user')).email
      ? JSON.parse(Cookies.get('user')).email
      : ''
  )
  const [password, setPassword] = useState('growskills')

  return (
    <div>
      <div className="h-[30vh] md:h-[30vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl text-xs md:text-base"></div>

      <div className="flex items-center justify-center">
        <div className="h-44 w-44 -mt-24 bg-white rounded-full shadow-lg" />
      </div>

      <div className="mt-4 p-2 flex flex-col gap-2">
        {/* input  */}

        <div className="wrapper flex flex-col gap-4 text-base md:text-lg">
          {/* each one  */}
          <Input
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {/* each one  */}

          {/* <Input
            placeholder="Bithday"
            type="date"
            value={birthday}
            onChange={e => setBirthday(e.target.value)}
          /> */}

          {/* each one  */}
          <Input
            placeholder="Number"
            type="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />

          {/* each one  */}
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {/* each one  */}
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Anchor route="/payment" title="Obter acesso" />
        </div>
      </div>
    </div>
  )
}
