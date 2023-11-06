'use client'

import NavBar from '@/components/App/Navbar'
import CheckplanLoading from '@/components/Universal/Loadings/CheckplanLoading'
import { ContextUser } from '@/context/ContextUser'
import PrivateRoutes from '@/functions/PrivateRoutes'
import { AnimatePresence, motion } from 'framer-motion'

export default function AppLayout({ children }) {
  const { hamburguer, isLoadingCheckPlan } = ContextUser()

  return (
    <PrivateRoutes>
      <div>
        {isLoadingCheckPlan && <CheckplanLoading />}
        <AnimatePresence>
          {hamburguer && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NavBar />
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </div>
    </PrivateRoutes>
  )
}
