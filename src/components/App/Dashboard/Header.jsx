'use client'

import Image from 'next/image'
import LOGO from '../../../../public/logo.svg'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ContextUser } from '@/context/ContextUser'
import Link from 'next/link'

export default function Header({ time, NoApp = true }) {
  const { hamburguer, setHamburguer } = ContextUser()

  return (
    <div className="app-header">
      <div className="app-header-left">
        <Image className="logo" src={LOGO} alt="Logo" />
        <span className="btn-days">
          {time.days
            ? time.days + ' dias restantes'
            : 0 + ' dias restantes'}
        </span>
      </div>
      {!NoApp ? (
        <Link className="login-anchor" href={'/login'}>
          Criar conta/Login
        </Link>
      ) : (
        <div className="app-header-right">
          <span
            onClick={() => setHamburguer(!hamburguer)}
            className={
              hamburguer
                ? 'app-header-menu active'
                : 'app-header-menu'
            }
          >
            {hamburguer ? 'Fechar' : 'Menu'}
          </span>

          {hamburguer ? (
            <div
              onClick={() => setHamburguer(!hamburguer)}
              className="hamburguer"
            >
              <div
                className={
                  hamburguer
                    ? 'hamburguer-arrow-close active'
                    : 'hamburguer-arrow-close'
                }
              >
                <motion.span
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 45, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.span
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: -45, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          ) : (
            <div
              onClick={() => setHamburguer(!hamburguer)}
              className="hamburguer"
            >
              <div className={'hamburguer-arrow'}>
                <span />
                <span />
              </div>
              <span className="arrow-middle"></span>
              <div className="hamburguer-arrow">
                <span />
                <span />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
