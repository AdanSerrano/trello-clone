import React, { ElementRef, useRef, useState } from 'react'

import { CardForm } from './CardForm';
import { CardItem } from './CardItem';
import { List } from '@prisma/client';
import { ListHeader } from './ListHeader';
import { ListWithCard } from '@/types';
import { cn } from '@/lib/utils';

interface ListItemsProps {
    index: number;
    data: ListWithCard
}

export const ListItems = ({
    index,
    data
}: ListItemsProps) => {
    const textareaRef = useRef<ElementRef<"textarea">>(null)
    const [isEditing, setIsEditing] = useState(false)

    const disabledEditing = () => {
        setIsEditing(false)
    }

    const enabledEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    }
    return (
        <li className='shrink-0 h-full w-[272px] select-none'>
            <div className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'>
                <ListHeader
                    onAddCard={enabledEditing}
                    data={data}
                />
                <ol
                    className={cn(
                        "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                        data.Card.length > 0 ? "mt-2" : "mt-0"
                    )}
                >
                    {data.Card.map((card, index) => (
                        <CardItem
                            key={card.id}
                            index={index}
                            data={card}
                        />
                    ))}
                </ol>
                <CardForm
                    isEditing={isEditing}
                    enabledEditing={enabledEditing}
                    disabledEditing={disabledEditing}
                    ref={textareaRef}
                    listId={data.id}
                />
            </div>
        </li>
    )
}
