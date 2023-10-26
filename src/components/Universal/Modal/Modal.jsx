'use client'

import { useMyContext } from '@/context/Context'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ children }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-zinc-950/75 z-50 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="bg-white  min-h-[10px] max-h-[80%] overflow-y-scroll w-[90%] md:w-2/6 p-4 shadow-sm rounded-lg text-zinc-50"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
