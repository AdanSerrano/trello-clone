'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import React, { useEffect, useState } from 'react'

import { ListForm } from './ListForm';
import { ListItems } from './ListItems';
import { ListWithCard } from '@/types';
import { toast } from 'sonner';
import { updateListOrder } from '@/actions/update-list-order';
import { updatedCardOrder } from '@/actions/update-card-order';
import { useAction } from '@/hooks/use-action';

interface ListContainerProps {
    boardId: string;
    data: ListWithCard[]
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [remove] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, remove);


    return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data)

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: (data) => {
            toast.success(`List Ordered`)
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updatedCardOrder, {
        onSuccess: (data) => {
            toast.success(`Card reordere`)
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    useEffect(() => {
        setOrderedData(data)
    }, [data])

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        // if Dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // user move is list
        if (type === 'list') {
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({
                ...item, order: index
            }))

            setOrderedData(items);

            executeUpdateListOrder({
                items,
                boardId
            })
        }

        // user Move is cards
        if (type === 'card') {
            let newOrderedData = [...orderedData];

            // Sorce and Destination list 
            const sourceList = newOrderedData.find(list => list.id === source.droppableId)
            const destList = newOrderedData.find(list => list.id === destination.droppableId)

            if (!sourceList || !destList) {
                return;
            }

            //check if cards exists on the source list
            if (!sourceList.Card) {
                sourceList.Card = []
            }

            // check if card exists on the destination list
            if (!destList.Card) {
                destList.Card = []
            }

            if (source.droppableId === destination.droppableId) {
                const reorderCards = reorder(
                    sourceList.Card,
                    source.index,
                    destination.index
                )

                reorderCards.forEach((card, index) => {
                    card.order = index
                })

                sourceList.Card = reorderCards;
                setOrderedData(newOrderedData)

                executeUpdateCardOrder({
                    boardId: boardId,
                    items: reorderCards,
                })
            } else {
                const [movedCard] = sourceList.Card.splice(source.index, 1)


                //asign the new listId to the moved card 
                movedCard.listId = destination.droppableId

                // add card to the destination list
                destList.Card.splice(destination.index, 0, movedCard)

                sourceList.Card.forEach((card, idx) => {
                    card.order = idx;
                })

                // Update the order for each card in the destination list
                destList.Card.forEach((card, idx) => {
                    card.order = idx;
                })

                setOrderedData(newOrderedData)

                executeUpdateCardOrder({
                    boardId: boardId,
                    items: destList.Card,
                })
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
                droppableId='lists'
                type='list'
                direction='horizontal'
            >
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='flex gap-x-3 h-full'
                    >
                        {orderedData.map((list, index) => {
                            return (
                                <ListItems
                                    key={list.id}
                                    index={index}
                                    data={list}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className='flex-shrink-0 w-1' />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}
