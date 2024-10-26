'use client'

import { Copy, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardWithList } from '@/types'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';
import { useParams } from 'next/navigation';

interface ActionsProps {
    data: CardWithList;
}

export const Actions = ({
    data
}: ActionsProps) => {
    const params = useParams()
    const { onClose } = useCardModal()

    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
        onSuccess: () => {
            toast.success(`Card "${data.title}" copied`)
            onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeDeletCard, isLoading: isLoadingDelete } = useAction(deleteCard, {
        onSuccess: () => {
            toast.success(`Card "${data.title}" delete`)
            onClose()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({
            id: data.id,
            boardId
        })
    }
    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeletCard({
            id: data.id,
            boardId
        })
    }

    return (
        <div className='space-y-2 mt-2'>
            <p className='text-sm font-medium'>
                Actions
            </p>
            <Button
                variant={'gray'}
                className='w-full items-start'
                size={'inline'}
                onClick={onCopy}
                disabled={isLoadingCopy}
            >
                <Copy className='size-4 mr-2 ' />
                Copy
            </Button>
            <Button
                variant={'gray'}
                className='w-full items-start'
                size={'inline'}
                onClick={onDelete}
                disabled={isLoadingDelete}
            >
                <Trash className='size-4 mr-2 ' />
                Delete
            </Button>
        </div>
    )
}

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className='space-y-2 mt-2'>
            <Skeleton className='w-20 h-4 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
            <Skeleton className='w-full h-8 bg-neutral-200' />
        </div>
    )
}