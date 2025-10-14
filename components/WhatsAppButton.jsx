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
  if (pathname.includes('dashboard')||pathname.includes('login')||pathname.includes('register') || pathname.includes('inventory')||pathname.includes('inventoryadjustment')||pathname.includes('invoice')||pathname.includes('items')||pathname.includes('supplier')||pathname.includes('warehouse')||pathname.includes('analytics')) {
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
              delay: 2 // Appear after button loads
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
            
            {/* Arrow pointing to button */}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-l-white"></div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 translate-x-px border-8 border-transparent border-l-gray-200"></div>
            
            {/* Progress bar */}
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
          {/* WhatsApp Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-200"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.506z"/>
          </svg>
        </button>

        {/* Regular Hover Tooltip (appears after initial popup is gone) */}
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
