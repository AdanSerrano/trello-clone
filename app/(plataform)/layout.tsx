import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from "@/components/providers/ModalProvider";
import { QueryProvider } from '@/components/providers/QueryProvider';
import React from 'react'
import { Toaster } from '@/components/ui/sonner'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <QueryProvider>
                <Toaster richColors closeButton theme="light" />
                <ModalProvider />
                {children}
            </QueryProvider>
        </ClerkProvider>
    )
}
