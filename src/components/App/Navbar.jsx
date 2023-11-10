"use client";

import { ContextUser } from "@/context/ContextUser";
import Header from "./Dashboard/Header";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function NavBar() {
  const { hamburguer, setHamburguer, logout } = ContextUser();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="app-nav-bar"
      >
        <div className="wrapper">
          <Header />

          <div className="routes">
            {routes.map((item, index) => (
              <Link
                onClick={() => setHamburguer(!hamburguer)}
                href={item.route}
                key={index}
                className="route"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="logout-container">
            <button onClick={logout}>Terminar Sessão</button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
