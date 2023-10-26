'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// My universal context
const MyContext = createContext({})

export const ContextProvider = ({ children }) => {
  const [modalInstall, setModalInstall] = useState(true)
  const [currentRoute, setCurrentRoute] = useState('')
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT_URL
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  useEffect(() => {}, [])
  return (
    <MyContext.Provider
      value={{
        modalInstall,
        setModalInstall,
        currentRoute,
        setCurrentRoute,
        ENDPOINT,
        GOOGLE_CLIENT_ID
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => useContext(MyContext)
