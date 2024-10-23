'use client'

import { CreditCard } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import { useOrganization } from '@clerk/nextjs'

export const Info = () => {
    const { organization, isLoaded } = useOrganization();

    if (!isLoaded) return <Info.Skeleton />
    return (
        <div className='flex items-center gap-x-4'>
            <div className='w-[60px] h-[60px] relative'>
                <Image
                    src={organization?.imageUrl!}

                    alt='Organization Image'
                    fill
                    className='object-cover rounded-md'

                />
            </div>
            <div className='space-y-1 '>
                <p className='font-semibold text-xl'>
                    {organization?.name}
                </p>
                <div className='flex items-center text-xs text-muted-foreground'>
                    <CreditCard className='size-4 mr-2' />
                    Free
                </div>
            </div>
        </div>
    )
}
Info.Skeleton = function SkeletonInfo() {
    return (
        <div className='flex items-center gap-x-4'>
            <div className='w-[60px] h-[60px] relative'>
                <Skeleton className='w-full h-full absolute' />
            </div>
            <div className='space-y-2 '>
                <Skeleton className='h-10 w-[200px]' />
                <div className='flex items-center'>
                    <Skeleton className='size-4 mr-2' />
                    <Skeleton className='h-4 w-[100px]' />
                </div>
            </div>
        </div>
    )
}
