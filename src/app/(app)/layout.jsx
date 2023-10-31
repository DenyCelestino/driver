import BottomTab from '@/components/Universal/BottomTab/BottomTab'
import PrivateRoutes from '@/functions/PrivateRoutes'

export const metadata = {
  title: 'App'
}

export default function AppLayout({ children }) {
  return (
    <PrivateRoutes>
      <div className="pb-14 md:pb-0">{children}</div>

      <BottomTab />
    </PrivateRoutes>
  )
}
