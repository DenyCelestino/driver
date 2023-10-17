'use client'

import toast from 'react-hot-toast'

export default function Button({
  title = 'title button',
  background = ' bg-cinza-100',
  color = 'text-zinc-500',
  onClick = () => {
    toast.success('clicked 😉')
  }
}) {
  return (
    <button
      className={`${background} ${color} py-2 px-4 rounded-lg text-xs md:text-base`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
