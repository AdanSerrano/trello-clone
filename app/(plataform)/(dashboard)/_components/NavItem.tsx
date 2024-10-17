'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Activity, CreditCard, Layout, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type Organization = {
    id: string;
    name: string;
    slug?: string;
    imageUrl?: string;
};

interface NavItemProps {
    isExpanded: boolean
    isActive: boolean
    organization: Organization
    onExpand: (id: string) => void
}

export const NavItem = ({
    isExpanded,
    isActive,
    organization,
    onExpand
}: NavItemProps) => {
    const router = useRouter()
    const pathname = usePathname()

    const routes = [
        {
            label: "Boards",
            icon: <Layout className='size-4 mr-2' />,
            href: `/organization/${organization.id}`
        },
        {
            label: "Activity",
            icon: <Activity className='size-4 mr-2' />,
            href: `/organization/${organization.id}/activity`
        },
        {
            label: "Settings",
            icon: <Settings className='size-4 mr-2' />,
            href: `/organization/${organization.id}/settings`
        },
        {
            label: "Billing",
            icon: <CreditCard className='size-4 mr-2' />,
            href: `/organization/${organization.id}/billing`
        },
    ];


    const onClick = (href: string) => {
        router.push(href)
    }
    return (
        <AccordionItem
            value={organization.id}
            className='border-none'
        >
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline w-full',
                    isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
                )}
            >
                <div className='flex items-center gap-x-2'>
                    <div className='h-7 w-7 relative'>
                        <Image
                            fill
                            src={organization.imageUrl!}
                            alt='Organization Image'
                            className='rounded-sm object-cover'
                        />
                    </div>
                    <span className='font-medium text-xs'>
                        {organization.name}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className='pt-1 text-neutral-700'>
                {routes.map((item) => (
                    <Button
                        key={item.href}
                        size={'sm'}
                        onClick={() => onClick(item.href)}
                        className={cn(
                            'w-full font-normal justify-start pl-10 mb-1 ',
                            pathname === item.href && 'bg-sky-500/10 text-sky-700'
                        )}
                        variant={'ghost'}
                    >
                        {item.icon}
                        {item.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    )
}
NavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className='flex items-center gap-x-2'>
            <div className='w-10 h-10'>
                <Skeleton className='h-full w-full absolute' />
            </div>
            <Skeleton className='h-10 w-full' />
        </div>
    );
}; 