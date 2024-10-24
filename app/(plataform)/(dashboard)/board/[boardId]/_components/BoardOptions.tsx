'use client'

import { MoreHorizontal, X } from 'lucide-react';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import React from 'react'
import { deleteBoard } from '@/actions/delete-board';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';

interface BoardOptionsProps {
    id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onSuccess: (data) => {
            toast.success('Delete success')
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDeleteBoard = () => {
        execute({ id })
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant={'transparent'}>
                    <MoreHorizontal className='size-4 ' />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='px-0 pt-3 pb-3'
                side='bottom'
                align='start'
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button
                        className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-700'
                        size={'icon'}
                        variant={'ghost'}
                    >
                        <X className='size-4' />
                    </Button>
                </PopoverClose>
                <Button
                    variant={'ghost'}
                    onClick={onDeleteBoard}
                    disabled={isLoading}
                    className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}
