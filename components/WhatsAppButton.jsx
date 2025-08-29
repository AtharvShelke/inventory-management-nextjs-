'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const WhatsAppButton = () => {
  const [showInitialPopup, setShowInitialPopup] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPopup(false)
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [])

  // ✅ Only decide rendering AFTER hooks
  if (pathname.includes('overview')||pathname.includes('login')||pathname.includes('register')) {
    return null
  }

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919881734646', '_blank', 'noopener,noreferrer')
  }

  const handleClosePopup = () => {
    setShowInitialPopup(false)
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Initial Popup Notification */}
      <AnimatePresence>
        {showInitialPopup && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              delay: 2 
            }}
            className="absolute right-16 -top-5 md:top-0 transform bg-white border border-gray-200 shadow-xl px-4 py-3 rounded-xl text-sm font-medium w-[70vw] md:w-max z-10"
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-3 h-3" />
            </button>
            
            <div className="flex items-start space-x-2 pr-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-xs mb-1">
                  Need Help?
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Chat with us directly on WhatsApp for instant support!
                </p>
              </div>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-green-500 rounded-b-xl"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Background */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main Button */}
        <button
          onClick={handleWhatsAppClick}
          className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200" />
        </button>

        {!showInitialPopup && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            Chat with us on WhatsApp
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default WhatsAppButton
