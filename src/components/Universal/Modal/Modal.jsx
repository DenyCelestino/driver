'use client'

import { useMyContext } from '@/context/Context'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ children }) {
  return (
    <AnimatePresence>
      <div className="modal-presences">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="modal-presences-content"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
