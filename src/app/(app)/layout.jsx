import BottomTab from '@/components/Universal/BottomTab/BottomTab'
import Checkplan from '@/functions/Checkplan'
import PrivateRoutes from '@/functions/PrivateRoutes'

export const metadata = {
  title: 'App'
}

export default function AppLayout({ children }) {
  return (
    <PrivateRoutes>
      <Checkplan>
        <div className="pb-14 md:pb-0">{children}</div>
        <BottomTab />
      </Checkplan>
    </PrivateRoutes>
  )
}
