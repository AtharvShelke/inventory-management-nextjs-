export const metadata = {
  title: {
    default: "Enrich Kitchen Studio | Custom Kitchen Designs & Remodeling",
    template: "%s | Enrich Kitchen Studio"
  },
  description: "Enrich Kitchen Studio offers high-end kitchen remodeling and custom kitchen designs, including modern, minimalist, luxury, and rustic styles.",
  alternates: { canonical: "https://www.enrichfurniture.com" },
};

import Footer from '@/components/website/Footer'
import Header from '@/components/website/Header'
import React from 'react'

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}
