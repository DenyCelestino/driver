'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Main() {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2 items-center min-h-screen justify-center">
      <h1>This is a landing page</h1>
      <Link className="underline" href={'/home'}>
        Go to home page
      </Link>
    </div>
  )
}
