import { HelpCircle, User2 } from 'lucide-react'

import { FormPopover } from '@/components/form/FormPopover'
import { Hint } from '@/components/Hint'
import Link from 'next/link'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export const BoardList = async () => {
    const { orgId } = auth()
    if (!orgId) {
        redirect(`/select-org`)
    }

    const boards = await db.board.findMany({
        where: {
            orgId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return (
        <div className='space-y-4'>
            <div className='flex items-center font-semibold text-lg text-neutral-700'>
                <User2 className='size-6 mr-2' />
                Yours Bords
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
                {boards.map((board) => (
                    <Link
                        href={`/board/${board.id}`}
                        key={board.id}
                        className='group aspect-video relative bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden'
                        style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
                    >
                        <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
                        <p className='relative font-semibold text-white'>
                            {board.title}
                        </p>
                    </Link>
                ))}
                <FormPopover
                    side='right'
                    sideOffset={10}
                >
                    <div
                        role='button'
                        className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
                    >
                        <p className='text-sm'>Create New Board</p>
                        <span className='text-xs'>5 remaining</span>
                        <Hint
                            sideOffset={40}
                            side={'bottom'}
                            description={`Free workspace can you have up to 5 open boards. For unlimited boards upgrate this workspace.`}
                        >
                            <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px] size-4' />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    )
}


BoardList.Skeleton = function BoardListSkeleton() {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            <Skeleton className='aspect-video h-full w-full p-2' />
            <Skeleton className='aspect-video h-full w-full p-2' />
            <Skeleton className='aspect-video h-full w-full p-2' />
            <Skeleton className='aspect-video h-full w-full p-2' />
            <Skeleton className='aspect-video h-full w-full p-2' />
            <Skeleton className='aspect-video h-full w-full p-2' />
            <Skeleton className='aspect-video h-full w-full p-2' />
            <Skeleton className='aspect-video h-full w-full p-2' />
        </div>
    );
};