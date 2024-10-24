import { ListContainer } from './_components/ListContainer'
import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function BoardIdPage({ params }: { params: { boardId: string } }) {
    const { orgId } = auth()

    if (!orgId) {
        redirect(`/select-org`)
    }

    const boardId = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })


    const lists = await db.list.findMany({
        where: {
            boardId: params.boardId,
            Board: {
                orgId,
            },
        },
        include: {
            Card: {
                orderBy: {
                    order: 'asc'
                }
            }
        },
        orderBy: {
            order: 'asc'
        }
    })
    return (
        <div className='p-4 h-full overflow-x-auto'>
            <ListContainer
                boardId={params.boardId}
                data={lists}
            />
        </div>
    )
}
