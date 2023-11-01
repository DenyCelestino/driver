import { BoxIcon, User2Icon } from 'lucide-react'
import Link from 'next/link'

const router = [
  {
    name: 'Dashboard',
    route: '/dashboard',
    icon: <BoxIcon />
  },
  {
    name: 'Profile',
    route: '/profile',
    icon: <User2Icon />
  }
]

export default function BottomTab() {
  return (
    <div className="fixed flex md:hidden bottom-0 h-14 border border-t-2 border-gray-200/25 bg-white shadow-md w-full items-center justify-around">
      {router.map((item, index) => (
        <Link href={item.route} key={index}>
          {item.icon}
        </Link>
      ))}
    </div>
  )
}
