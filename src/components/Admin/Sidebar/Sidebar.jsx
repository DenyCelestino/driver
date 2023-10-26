'use client'

import { useMyContext } from '@/context/Context'
import { routes } from '@/utils/adminRoutes'
import Link from 'next/link'

export default function Sidebar() {
  const { currentRoute, setCurrentRoute } = useMyContext()

  return (
    <div className="hidden md:flex flex-col gap-2 fixed left-0 top-0 bottom-0 w-[300px]  bg-primary-200 min-h-screen  p-6 z-10">
      <h1 className="text-zinc-50">TrafegoTop CMS</h1>
      <div className="wrapper flex flex-col gap-4 min-h-[80vh] max-h-[80vh] overflow-y-scroll">
        {routes.map((item, index) => (
          <Link
            onClick={() => setCurrentRoute(item.name)}
            className={`${
              currentRoute == item.name
                ? 'bg-zinc-50 text-primary-200'
                : 'bg-transparent text-zinc-50'
            }  p-2 rounded flex items-center gap-2`}
            href={item.path}
            key={index}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
