'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('')

  const getUser = async () => {
    const usuario = JSON.parse(localStorage.getItem('user'))
    setUser(usuario)
  }

  const setLogged = async user => {
    localStorage.setItem('user', user)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        setUser,
        user,
        setLogged
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const ContextUser = () => useContext(UserContext)
