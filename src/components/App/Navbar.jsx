'use client'

import { ContextUser } from '@/context/ContextUser'
import Header from './Dashboard/Header'
import { motion, AnimatePresence } from 'framer-motion'
import { routes } from '@/utils/routes'
import Link from 'next/link'

export default function NavBar() {
  const { bypass, hamburguer, setHamburguer, logout } = ContextUser()
  return (
    <div className="app-nav-bar">
      <div className="wrapper">
        <Header App={true} time={bypass} />

        <div className="routes">
          {routes.map((item, index) => (
            <Link
              onClick={() => setHamburguer(!hamburguer)}
              href={item.route}
              key={index}
              className="route"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="logout-container">
          <button onClick={logout}>Terminar Sessão</button>
        </div>
      </div>
    </div>
  )
}
