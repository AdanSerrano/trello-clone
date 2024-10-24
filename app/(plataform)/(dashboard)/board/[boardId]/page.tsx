import React from 'react'
import { db } from '@/lib/db'

export default async function BoardIdPage({ params }: { params: { boardId: string } }) {
    const boardId = await db.board.findUnique({
        where: {
            id: params.boardId
        }
    })
    console.log({ boardId })
    return (
        <div className='my-20'>{boardId?.title}</div>
    )
}
