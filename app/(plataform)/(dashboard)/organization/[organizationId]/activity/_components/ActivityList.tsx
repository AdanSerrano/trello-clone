import { ActivityItems } from '@/components/ActivityItems'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export const ActivityList = async () => {
    const { orgId } = auth()
    if (!orgId) {
        redirect('/select-org')
    }

    const auditLog = await db.auditLog.findMany({
        where: {
            orgId
        }
    })
    return (
        <ol className='space-y-4 mt-4'>
            <p className='hidden last:block text-sm text-center text-muted-foreground'>
                No activity found inside this organization
            </p>
            {auditLog.map((item) => (
                <ActivityItems
                    key={item.id}
                    data={item}
                />
            ))}
        </ol>
    )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
    return (
        <ol className='space-y-4 mt-4'>
            <Skeleton className='w-[80%] h-14' />
            <Skeleton className='w-[50%] h-14' />
            <Skeleton className='w-[70%] h-14' />
            <Skeleton className='w-[80%] h-14' />
            <Skeleton className='w-[75%] h-14' />
        </ol>
    )
}