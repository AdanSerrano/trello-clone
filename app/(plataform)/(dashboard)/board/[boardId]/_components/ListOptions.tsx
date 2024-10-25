import { MoreHorizontal, X } from 'lucide-react';
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { ElementRef, useRef } from 'react'

import { Button } from '@/components/ui/button';
import { FormButton } from '@/components/form/FormButton';
import { List } from '@prisma/client'
import { Separator } from '@/components/ui/separator';
import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';

interface ListOptionsProps {
    data: List;
    addOnCard: () => void;
}


export const ListOptions = ({
    data,
    addOnCard
}: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`Delete list ${data.title}`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`Copy list ${data.title}`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })


    const onDelete = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeDelete({
            id,
            boardId
        })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeCopy({
            id,
            boardId
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    className='h-auto w-auto p-2'
                    variant={'ghost'}
                >
                    <MoreHorizontal className='size-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='px-0 py-3' side={'bottom'} align='start'>
                <div className='text-sm font-medium text-center text-neutral-700'>
                    List Options
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button className='h-auto w-auto p-2 absolute top-2 right-2' variant={'ghost'} size={'icon'}>
                        <X className='size-4' />
                    </Button>
                </PopoverClose>
                <Button
                    className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    onClick={addOnCard}
                    variant={'ghost'}
                >
                    Add Card...
                </Button>
                <form
                    action={onCopy}
                >
                    <input hidden id='id' name='id' value={data.id} />
                    <input hidden id='boardId' name='boardId' value={data.boardId} />
                    <FormButton
                        variant={'ghost'}
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    >
                        Copy List
                    </FormButton>
                </form>
                <Separator />
                <form
                    action={onDelete}
                >
                    <input hidden id='id' name='id' value={data.id} />
                    <input hidden id='boardId' name='boardId' value={data.boardId} />
                    <FormButton
                        variant={'ghost'}
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    >
                        Delete this list
                    </FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}