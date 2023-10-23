'use client'

import Lottie from 'lottie-react'
import CONGRATS from '../../../../public/animations/congrats.json'
import OOPS from '../../../../public/animations/opps.json'
import useSound from 'use-sound'
import { useEffect } from 'react'
export default function Result({
  total = 0,
  score = 0,
  minutes = 0,
  seconds = 0,
  Try,
  Return
}) {
  return (
    <div className="flex flex-col gap-2 py-4 fixed inset-0 z-50 bg-white">
      <div className="wrapper text-center flex flex-col gap-4">
        <h1>Resultados</h1>

        <div className="flex items-center justify-center">
          {score >= 9 ? (
            <div className="flex flex-col items-center justify-center gap-3 ">
              <Lottie
                className="h-20 w-20"
                animationData={CONGRATS}
                loop={true}
              />
              <p>
                Parabéns, sua avaliação foi positiva, sua pontuação
                foi: {score}/{total}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 ">
              <Lottie
                className="h-20 w-20"
                animationData={OOPS}
                loop={true}
              />
              <p>
                Lamentamos, sua avaliação foi negativa, sua pontuação
                foi: {score}/{total}
              </p>
              <p>Pontuação aceitavel deve ser 7 ou mais</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="bg-cinza-100 p-2 w-1/2 flex flex-col items-center justify-center rounded shadow">
            <h1>Tempo:</h1>
            <span>{minutes + ':' + seconds}</span>
          </div>
          <div className="bg-cinza-100 p-2 w-1/2 flex flex-col items-center justify-center rounded shadow">
            <h1> Pontuação:</h1>
            <span>{score + '/' + total}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={Try}
            className="bg-green-600 text-zinc-50 p-2 rounded"
          >
            Fazer novamente
          </button>
          <button
            className="bg-black text-zinc-50 p-2 rounded"
            onClick={Return}
          >
            Voltar para dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
