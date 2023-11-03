'use client'

import { useMyContext } from '@/context/Context'
import { ContextUser } from '@/context/ContextUser'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function Checkplan({ children }) {
  const { ENDPOINT } = useMyContext()
  const { setBypass } = ContextUser()

  const router = useRouter()

  const checkPlan = async () => {
    const getUserCookie = Cookies.get('user')
    const user = getUserCookie ? JSON.parse(getUserCookie) : {}
    try {
      let res = await axios.get(
        `${ENDPOINT}checkdays.php?user=${user.id}`
      )

      setBypass(res.data)
      if (res.data.status == 200) {
        router.push('/dashboard')
      } else if (res.data.status == 404) {
        router.push('/payment')
      } else {
        toast.error(
          'Opps, erro tentando verificar o plano, tente novamente'
        )
        router.push('/login')
      }
    } catch (error) {
      console.error('Erro ao verificar o plano:', error)
    }
  }

  useEffect(() => {
    checkPlan()
  }, [])

  return children
}
