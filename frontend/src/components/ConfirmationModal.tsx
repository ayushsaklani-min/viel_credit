import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'info' | 'danger'
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info'
}: ConfirmationModalProps) {
  const colors = {
    warning: 'from-yellow-500 to-orange-500',
    info: 'from-neon-blue to-neon-purple',
    danger: 'from-red-500 to-pink-500'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl p-6 max-w-md w-full border border-white/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[type]} flex items-center justify-center`}>
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{title}</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-300 mb-6">{message}</p>
              
              <div className="flex space-x-3">
                <motion.button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-lg glass-hover border border-white/10 font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {cancelText}
                </motion.button>
                <motion.button
                  onClick={() => {
                    onConfirm()
                    onClose()
                  }}
                  className={`flex-1 py-3 rounded-lg bg-gradient-to-r ${colors[type]} text-white font-semibold`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {confirmText}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
