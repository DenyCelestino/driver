import Header from "@/components/Admin/Header/Header";
import Sidebar from "@/components/Admin/Sidebar/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="admin">
      <Header />
      <div className="admin-sidebar ">
        <Sidebar />
      </div>
      <div className="admin-content">{children}</div>
    </div>
  );
}
