'use client'

import { Card, List } from '@prisma/client';
import React, { useEffect, useState } from 'react'

import { ListForm } from './ListForm';
import { ListItems } from './ListItems';
import { ListWithCard } from '@/types';

interface ListContainerProps {
    boardId: string;
    data: ListWithCard[]
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data)

    useEffect(() => {
        setOrderedData(data)
    }, [data])

    return (
        <ol className='flex gap-x-3 h-full'>
            {orderedData.map((list, index) => {
                return (
                    <ListItems
                        key={list.id}
                        index={index}
                        data={list}
                    />
                )
            })}
            <ListForm />
            <div className='flex-shrink-0 w-1' />
        </ol>
    )
}
