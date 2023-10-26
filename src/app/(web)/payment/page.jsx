'use client'

import Input from '@/components/Universal/Inputs/input'
import Modal from '@/components/Universal/Modal/Modal'
import { useMyContext } from '@/context/Context'
import axios from 'axios'
import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import CHECK from '../../../../public/animations/check.json'
import SUCESS from '../../../../public/animations/sucess.json'
import { DotLoader } from 'react-spinners'

export default function Payment() {
  const [number, setNumber] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  const { ENDPOINT } = useMyContext()

  const router = useRouter()
  const payment = async () => {
    try {
      setLoading(true)

      let res = await axios.post(
        `${ENDPOINT}payment.php`,
        JSON.stringify({
          number: number,
          amount: 10
        }),
        { cancelToken: source.token }
      )
      setLoading(false)
      console.log(res)
      if (
        res.data.result.status == 201 ||
        res.data.result.status == 200
      ) {
        setIsPaid(true)
        setTimeout(() => {
          setIsPaid(false)
          router.push('/dashboard')
        }, 4000)
      } else {
        toast.error('Payment not sucessful, please try again')
      }
    } catch (error) {
      setLoading(false)
      setIsPaid(false)
      toast.error('Payment not sucessful, please try again')
      console.log(error)
    }
  }

  return (
    <div className="text-xs md:text-base">
      {isLoading && (
        <Modal>
          <div className="flex flex-col items-center justify-center text-xs md:text-base text-center">
            <h1>Verifique seu celular</h1>
            <Lottie
              className="h-40 w-40"
              animationData={CHECK}
              loop={true}
            />
            <p>
              Enviamos um notificação para seu celular, verifique e
              siga as instruções para continuar...
            </p>

            {isLoading && <DotLoader size={20} color="#DC4266" />}
          </div>
        </Modal>
      )}
      {isPaid && (
        <Modal>
          <div className="flex flex-col items-center justify-center text-xs md:text-base text-center">
            <h1>Sucessos!</h1>
            <Lottie
              className="h-40 w-40"
              animationData={SUCESS}
              loop={true}
            />
            <p>Pagamento efectuado com sucesso...</p>
            <p>Aguarde um momento...</p>

            {isPaid && <DotLoader size={20} color="#DC4266" />}
          </div>
        </Modal>
      )}
      <div className="h-[30vh] md:h-[50vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl text-xs md:text-base"></div>
      <div className="flex items-center justify-center">
        <div className="h-44 w-44 -mt-24 bg-white rounded-full shadow-lg" />
      </div>

      <div className="mt-6">
        <div className="wrapper flex flex-col items-center gap-6">
          <Input
            placeholder="Digite seu celular"
            type="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <button className="underline">Usar outro numero</button>
          {isLoading ? (
            <p>Verifique seu celular....</p>
          ) : (
            <div>
              <button
                className="bg-cinza-100 py-2 px-4 rounded-lg"
                onClick={payment}
              >
                Obter acesso
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
