"use client";

import Header from "@/components/App/Dashboard/Header";
import Rooms from "@/components/App/Dashboard/Rooms";
import { ContextUser } from "@/context/ContextUser";
import PrivateRoutes from "@/functions/PrivateRoutes";

export default function Dashboard() {
  const { bypass } = ContextUser();

  return (
    <PrivateRoutes>
      <section className="dashboard">
        <div className="wrapper">
          <Header App={true} time={bypass} />
          <Rooms />
        </div>
      </section>
    </PrivateRoutes>
  );
}
