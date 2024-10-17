'use client'

import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { usePathname } from 'next/navigation'

export const MobileSidebar = () => {
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)
    const { onClose, isOpen, onOpen } = useMobileSidebar()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        onClose()
    }, [pathname, onClose])

    if (!isMounted) return null

    return (
        <>
            <Button
                onClick={onOpen}
                className='block sm:hidden'
                variant={'ghost'}
                size={'sm'}
            >
                <MenuIcon className='size-4' />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side={'left'}
                    className='p-2 pt-10'
                >
                    <Sidebar storageKey='t-sidebar-mobile-state' />
                </SheetContent>
            </Sheet>
        </>
    )
}
