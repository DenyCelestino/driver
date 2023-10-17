'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// My universal context
const MyContext = createContext({})

export const ContextProvider = ({ children }) => {
  const [modalInstall, setModalInstall] = useState(true)

  useEffect(() => {}, [])
  return (
    <MyContext.Provider value={{ modalInstall, setModalInstall }}>
      {children}
    </MyContext.Provider>
  )
}

export const useMyContext = () => useContext(MyContext)
