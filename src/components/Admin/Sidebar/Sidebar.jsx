"use client";

import { useMyContext } from "@/context/Context";
import { routes } from "@/utils/adminRoutes";
import Link from "next/link";

export default function Sidebar() {
  const { currentRoute, setCurrentRoute } = useMyContext();

  return (
    <div className="admin-sidebar">
      <span className="logo">TrafegoTop CMS</span>
      <div className="wrapper">
        {routes.map((item, index) => (
          <Link
            onClick={() => setCurrentRoute(item.name)}
            className={`${
              currentRoute == item.name
                ? "bg-zinc-50 text-primary-200"
                : "bg-transparent text-zinc-50"
            }  p-2 rounded flex items-center gap-2`}
            href={item.path}
            key={index}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
