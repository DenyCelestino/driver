'use client'

import { useMyContext } from '@/context/Context'
import { ContextUser } from '@/context/ContextUser'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
      console.log(res)
      setBypass(res.data)
      if (res.data.status === 404) {
        router.push('/payment')
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
