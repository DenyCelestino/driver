"use client";

import NavBar from "@/components/App/Navbar";
import CheckplanLoading from "@/components/Universal/Loadings/CheckplanLoading";
import { ContextUser } from "@/context/ContextUser";
import PrivateRoutes from "@/functions/PrivateRoutes";
import { AnimatePresence, motion } from "framer-motion";

export default function AppLayout({ children }) {
  const { hamburguer, isLoadingCheckPlan } = ContextUser();

  return (
    <div className="scrollable">
      {isLoadingCheckPlan && <CheckplanLoading />}
      <AnimatePresence>
        {hamburguer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {hamburguer && <NavBar />}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
