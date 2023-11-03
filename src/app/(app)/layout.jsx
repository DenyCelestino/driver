'use client'

import NavBar from '@/components/App/Navbar'
import { ContextUser } from '@/context/ContextUser'
import Checkplan from '@/functions/Checkplan'
import PrivateRoutes from '@/functions/PrivateRoutes'

export default function AppLayout({ children }) {
  const { hamburguer, setHamburguer } = ContextUser()

  return (
    <Checkplan>
      <PrivateRoutes>
        <div>
          {hamburguer && <NavBar />}
          {children}
        </div>
      </PrivateRoutes>
    </Checkplan>
  )
}
