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
  const getUserCookie = Cookies.get('user')
  const userCookie = getUserCookie ? JSON.parse(getUserCookie) : {}
  const [user, setUser] = useState(userCookie ? userCookie : '')
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

  useEffect(() => {
    getUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        setCookies,
        getUser,
        bypass,
        setBypass,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const ContextUser = () => useContext(UserContext)
