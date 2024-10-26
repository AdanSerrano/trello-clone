import { notFound, redirect } from 'next/navigation';

import { BoardNavbar } from './_components/BoardNavbar';
import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function generateMetadata({
    params
}: {
    params: { boardId: string }
}) {
    const { orgId } = auth()
    if (!orgId) {
        return {
            title: "Board"
        }
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    return {
        title: board?.title || 'Board'
    }
}

export default async function BoardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { boardId: string }
}) {
    const { orgId } = auth()

    if (!orgId) {
        redirect(`/selected-org`)
    }

    const boardId = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    if (!boardId) {
        notFound()
    }

    return (
        <div
            className='relative h-full min-h-screen bg-no-repeat bg-cover bg-center'
            style={{
                backgroundImage: `url(${boardId.imageFullUrl})`
            }}
        >
            <BoardNavbar data={boardId} />
            <div className='absolute inset-0 bg-black/30' />
            <main className='relative pt-28 h-full'>
                {children}
            </main>
        </div>
    )
}
