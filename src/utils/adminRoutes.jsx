import { CurlyBracesIcon, LayoutDashboard } from 'lucide-react'

const size = 20
export const routes = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard size={size} />
  },
  {
    name: 'Quizzes',
    path: '/admin/quizzes',
    icon: <CurlyBracesIcon size={size} />
  }
]
