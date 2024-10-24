import { Card, List } from '@prisma/client';

import { ListForm } from './ListForm';
import { ListWithCard } from '@/types';
import React from 'react'

interface ListContainerProps {
    boardId: string;
    data: ListWithCard[]
}

export const ListContainer = ({ }: ListContainerProps) => {
    return (
        <ol>
            <ListForm />
            <div className='flex-shrink-0 w-1' />
        </ol>
    )
}
