'use client'

import Header from '@/components/LandingPage/Header'
import Hero from '@/components/LandingPage/Hero'

import { useRouter } from 'next/navigation'

export default function Main() {
  const router = useRouter()

  return (
    <>
      <Header />
      <Hero />
    </>
  )
}
