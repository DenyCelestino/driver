'use client'

import Anchor from '@/components/Universal/Anchor/anchor'
import Button from '@/components/Universal/Button/button'
import Input from '@/components/Universal/Inputs/input'
import Link from 'next/link'
import { useState } from 'react'

export default function Payment() {
  const [number, setNumber] = useState('848990989')

  return (
    <div>
      <div className="h-[30vh] md:h-[50vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl text-xs md:text-base"></div>
      <div className="flex items-center justify-center">
        <div className="h-44 w-44 -mt-24 bg-white rounded-full shadow-lg" />
      </div>

      <div className="mt-6">
        <div className="wrapper flex flex-col items-center gap-6">
          <Input
            placeholder="number"
            type="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <button className="underline">Usar outro numero</button>
          <div>
            <Anchor route="/dashboard" title="Obter acesso agora" />
          </div>
        </div>
      </div>
    </div>
  )
}
