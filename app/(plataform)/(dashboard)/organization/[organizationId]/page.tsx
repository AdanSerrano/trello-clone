import { Board } from './Board'
import { CreateBoard } from '@/actions/create-board'
import { Form } from './Form'
import React from 'react'
import { Tilt_Neon } from 'next/font/google'
import { db } from '@/lib/db'

export default async function OrganizationIdPage() {
    const boards = await db.board.findMany()
    return (
        <div className='flex flex-col space-y-4'>
            <Form />
            <div className='space-y-2'>
                {boards.map((board) => (
                    <Board key={board.id} id={board.id} title={board.title} />
                ))}
            </div>
        </div>
    )
}
