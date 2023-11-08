'use client'

import Image from 'next/image'
import LOGO from '../../../../public/logo.svg'
import LOGOWHITE from '../../../../public/logo-white.svg'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ContextUser } from '@/context/ContextUser'
import Link from 'next/link'

export default function Header({
  time,
  App = false,
  buttons = true
}) {
  const { hamburguer, setHamburguer } = ContextUser()

  return (
    <div className="app-header">
      <div className="app-header-left">
        <div
          className={
            hamburguer ? 'logo logo-white' : 'logo logo-green'
          }
        >
          {hamburguer ? (
            <Image src={LOGO} />
          ) : (
            <Image src={LOGOWHITE} alt="Logo" />
          )}
        </div>
        {App && (
          <>
            {time.days <= 7 && (
              <span className="btn-days">
                {time.days
                  ? time.days + ' dias restantes'
                  : 0 + ' dias restantes'}
              </span>
            )}
          </>
        )}
      </div>

      {buttons && (
        <>
          {App ? (
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
          ) : (
            <Link className="login-anchor" href={'/login'}>
              Criar conta/Login
            </Link>
          )}
        </>
      )}
    </div>
  )
}
