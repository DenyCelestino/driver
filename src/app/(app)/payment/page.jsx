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
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'

export default function Payment() {
  const [number, setNumber] = useState(
    JSON.parse(Cookies.get('user')).number
      ? JSON.parse(Cookies.get('user')).number
      : ''
  )
  const [isLoading, setLoading] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  const { ENDPOINT } = useMyContext()

  const router = useRouter()
  const payment = async e => {
    e.preventDefault()
    if (number.length < 9 || number.length > 9) {
      toast.error('Please enter a valid phone number')
    } else {
      try {
        setLoading(true)

        let res = await axios.post(
          `${ENDPOINT}payment.php`,
          JSON.stringify({
            user: JSON.parse(Cookies.get('user')).id,
            number: number,
            amount: 10
          })
        )
        setLoading(false)
        console.log(res)
        if (res.data.status == 201 || res.data.status == 200) {
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
      <div className="h-[30vh] md:h-[30vh] bg-cinza-100 rounded-bl-3xl rounded-br-3xl text-xs md:text-base"></div>
      <div className="flex items-center justify-center">
        <div className="h-44 w-44 -mt-24 bg-white rounded-full shadow-lg" />
      </div>

      <div className="mt-6 flex items-center justify-center flex-col gap-4">
        <form
          onSubmit={e => payment(e)}
          className="wrapper flex flex-col items-center gap-6"
        >
          <Input
            className="bg-cinza-100 py-2 px-4 rounded-lg  w-full"
            placeholder="Digite seu celular"
            type="number"
            value={number}
            onChange={e => setNumber(e.target.value)}
            required
          />
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
        </form>
        <button className="underline">Usar outro numero</button>
      </div>
    </div>
  )
}
