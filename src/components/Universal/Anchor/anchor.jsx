'use client'

import Link from 'next/link'

export default function Anchor({
  title = 'title button',
  background = ' bg-cinza-100',
  color = 'text-zinc-500',
  route = '#'
}) {
  return (
    <Link
      className={`${background} ${color} py-2 px-4 rounded text-center text-xs md:text-base`}
      href={route}
    >
      {title}
    </Link>
  )
}
