'use client'

import { Button } from '@/components/ui/button'
import { DeleteBoard } from '@/actions/create-board'
import { FormDeleteButton } from './FormDeleteButton'
import React from 'react'

interface BoardProps {
    title: string,
    id: string
}

export const Board = ({ title, id }: BoardProps) => {
    const deleteBoardWithId = DeleteBoard.bind(null, id)
    return (
        <form action={deleteBoardWithId} className='flex items-center gap-x-2'>
            <p>
                Board Title:  {title}
            </p>
            <FormDeleteButton />
        </form>
    )
}
