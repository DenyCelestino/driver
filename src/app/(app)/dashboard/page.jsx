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
    route: '/lesson'
  },
  {
    title: 'Test Exam',
    route: '/test'
  },
  {
    title: 'Exam',
    route: '/exam'
  }
]

export default function Dashboard() {
  const { bypass } = ContextUser()

  return (
    <section className="dashboard">
      <div className="wrapper">
        <Header time={bypass} />
        <Rooms />
      </div>
    </section>
  )
}
