import Footer from '@/components/website/Footer'
import Header from '@/components/website/Header'
import React from 'react'

export default function Layout({ children }) {
  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  )
}
