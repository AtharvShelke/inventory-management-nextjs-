'use client'

import { usePathname } from 'next/navigation'
import WhatsAppButton from '../WhatsAppButton'

export default function ConditionalLayout({ children }) {
  const pathname = usePathname()
  const isBackendPath = pathname?.includes('(backend)')

  return (
    <>
      {children}
      {!isBackendPath && <WhatsAppButton />}
    </>
  )
}