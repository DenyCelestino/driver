'use client'

import Lottie from 'lottie-react'
import CONGRATS from '../../../../public/animations/congrats.json'
import OOPS from '../../../../public/animations/opps.json'
import useSound from 'use-sound'
import { useEffect } from 'react'
import { ContextUser } from '@/context/ContextUser'
import Header from '@/components/App/Dashboard/Header'
import Link from 'next/link'
export default function Result({
  total = 0,
  score = 0,
  minutes = 0,
  seconds = 0,
  Try,
  Return,
  test = false
}) {
  const { bypass } = ContextUser()

  return (
    <div className="modal">
      <div className="wrapper">
        <Header time={bypass} />

        <div className="header-result">
          <h1 className="title">Parabéns</h1>
          <p>
            Sua pontuação foi de <span>{score}</span> de{' '}
            <span>{total}</span>
          </p>
        </div>
        <div className="congrats-image">
          <h1>Parabéns</h1>
          <p>Some image</p>
        </div>

        <div className="share">
          <Link href="#">Share on Facebook</Link>
          <Link href="#">Share on Facebook</Link>
        </div>
        <p className="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quo, obcaecati? Voluptas debitis, eligendi.
        </p>

        <div className="try">
          <button onClick={Try} className="tryagain">
            {test ? 'Obter Acesso' : 'Tentar Novamente'}
          </button>
          <button onClick={Return} className="back">
            {test ? 'Sair' : 'Voltar'}
          </button>
        </div>
      </div>
    </div>
  )
}
