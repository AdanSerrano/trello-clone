import { List } from '@prisma/client';
import { ListHeader } from './ListHeader';
import { ListWithCard } from '@/types';
import React from 'react'

interface ListItemsProps {
    index: number;
    data: ListWithCard
}

export const ListItems = ({
    index,
    data
}: ListItemsProps) => {
    return (
        <li className='shrink-0 h-full w-[272px] select-none'>
            <div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
                <ListHeader data={data} />
            </div>
        </li>
    )
}
