'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useMyContext } from './Context'
import axios from 'axios'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [bypass, setBypass] = useState('')
  const { ENDPOINT } = useMyContext()

  const router = useRouter()

  const logout = () => {
    Cookies.remove('user')

    router.push('/login')
  }

  const getUser = () => {
    const getUserCookie = Cookies.get('user')
    const user = getUserCookie ? JSON.parse(getUserCookie) : {}
    setUser(user)
  }

  const setCookies = user => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 })
    getUser()
  }

  const checkPlan = useCallback(async () => {
    const getUserCookie = Cookies.get('user')
    const user = getUserCookie ? JSON.parse(getUserCookie) : {}
    try {
      let res = await axios.get(
        `${ENDPOINT}checkdays.php?user=${user.id}`
      )
      setBypass(res.data)
      if (res.data.status === 404) {
        router.push('/payment')
      }
    } catch (error) {
      console.error('Erro ao verificar o plano:', error)
    }
  }, [ENDPOINT, router])

  useEffect(() => {
    getUser()
    user && checkPlan()
  }, [checkPlan, user])

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        setCookies,
        getUser,
        bypass,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const ContextUser = () => useContext(UserContext)
