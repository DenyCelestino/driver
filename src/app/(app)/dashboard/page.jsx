'use client'

import Header from '@/components/App/Dashboard/Header'
import Rooms from '@/components/App/Dashboard/Rooms'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const rooms = [
  {
    title: 'Learn',
    route: '/me/lesson'
  },
  {
    title: 'Test Exam',
    route: '/me/test'
  },
  {
    title: 'Exam',
    route: '/me/exam'
  }
]

export default function Dashboard() {
  const { bypass } = ContextUser()

  return (
    <section className="dashboard">
      <div className="wrapper">
        <Header App={true} time={bypass} />
        <Rooms />
      </div>
    </section>
  )
}
