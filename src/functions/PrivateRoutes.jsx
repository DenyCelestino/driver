'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useMyContext } from '@/context/Context'

export default function PrivateRoutes({ children }) {
  const { ENDPOINT } = useMyContext()
  const { user, setUser, setBypass, setLoadingCheckPlan } =
    ContextUser()

  const router = useRouter()

  const checkPlan = async user => {
    try {
      setLoadingCheckPlan(true)
      let res = await axios.get(
        `${ENDPOINT}checkdays.php?user=${user.id}`
      )
      console.log(res.data)
      setBypass(res.data)

      if (res.data.status == 200) {
        router.push('/dashboard')
        setLoadingCheckPlan(false)
      } else if (res.data.status == 404) {
        router.push('/payment')
        setLoadingCheckPlan(false)
      } else {
        setLoadingCheckPlan(false)
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
  }, [router, setUser, checkPlan])

  return user ? children : null
}
