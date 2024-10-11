import { Navbar } from './_components/Navbar'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-full'>
            <Navbar />
            {children}
        </div>
    )
}
