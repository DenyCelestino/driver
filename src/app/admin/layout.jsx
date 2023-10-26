import Header from '@/components/Admin/Header/Header'
import Sidebar from '@/components/Admin/Sidebar/Sidebar'

export default function AdminLayout({ children }) {
  return (
    <div className="flex pt-20">
      <Header />
      <div className="hidden md:block md:w-[300px]">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
