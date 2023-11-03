'use client'

import Header from '@/components/App/Dashboard/Header'
import Rooms from '@/components/App/Dashboard/Rooms'
import { ContextUser } from '@/context/ContextUser'
import Cookies from 'js-cookie'
import Link from 'next/link'

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
  const { bypass, logout } = ContextUser()
  const getUserCookie = Cookies.get('user')
  const user = getUserCookie ? JSON.parse(getUserCookie) : {}

  return (
    <section className="dashboard">
      <div className="wrapper">
        <Header time={bypass} />
        <Rooms />
      </div>
    </section>
  )
}
