import { Footer } from './_components/Footer'
import { Navbar } from './_components/Navbar'
import React from 'react'

export default function MarketingLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-full bg-slate-100'>
      <Navbar />
      <main className='pt-40 bg-slate-100 pb-20'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
