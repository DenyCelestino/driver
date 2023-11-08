'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useMyContext } from '@/context/Context'
import toast from 'react-hot-toast'

export default function BackgroundCheck({ children }) {
  const { ENDPOINT } = useMyContext()

  const { setUser } = ContextUser()

  const router = useRouter()

  const checkPlan = async user => {
    try {
      let res = await axios.get(
        `${ENDPOINT}checkdays.php?user=${user.id}`
      )

      if (res.data.status == 200) {
      } else if (res.data.status == 404) {
        toast('Opps... parece que você não tem um plano')
        router.push('/payment')
      } else {
        toast.error(
          'Opps, erro tentando verificar o plano, tente novamente'
        )
        router.push('/login')
      }
    } catch (error) {
      console.error('Erro ao verificar o plano:', error)
      router.push('/login')
    }
  }

  useEffect(() => {
    const userData = Cookies.get('user')
    if (Cookies.get('logged')) {
      if (!userData) {
        console.log(userData)
        console.log('no user')
        router.push('/login')
      } else {
        console.log('user setado: ', JSON.parse(userData))
        setUser(JSON.parse(userData))
        checkPlan(JSON.parse(userData))
      }
    } else {
      router.push('/login')
    }
  }, [router])

  return children
}
