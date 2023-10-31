'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { useMyContext } from './Context'
import axios from 'axios'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [localUser, setLocalUser] = useState('')
  const [bypass, setBypass] = useState('')
  const { ENDPOINT } = useMyContext()

  const router = useRouter()

  const logout = () => {
    Cookies.remove('user')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const getUser = () => {
    setUser(JSON.parse(Cookies.get('user')))
  }

  const setCookies = user => {
    Cookies.set('user', JSON.stringify(user), { expires: 7 })
    getUser()
  }

  const checkPlan = async () => {
    let res = await axios.get(
      `${ENDPOINT}checkdays.php?user=${
        JSON.parse(window.localStorage.getItem('user')).id
      })
      )}`
    )

    setBypass(res.data)
    if (res.data.status == 404) {
      router.push('/payment')
    }
  }

  useEffect(() => {
    getUser()

    if (JSON.parse(window.localStorage.getItem('user'))) {
      checkPlan()
    }
  }, [])

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
