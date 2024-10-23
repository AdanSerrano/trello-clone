'use client'

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Button } from '../ui/button';
import { FormButton } from './FormButton';
import { FormInput } from './FormInput';
import React from 'react'
import { X } from 'lucide-react';
import { createBoard } from '@/actions/create-board';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom'
    align?: 'start' | 'center' | 'end'
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = 'bottom',
    align,
    sideOffset
}: FormPopoverProps) => {

    const { execute, FieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log({ data })
            toast.success('Board Created')
        },
        onError: (error) => {
            console.log({ error })
            toast.error(error)
        }
    })

    const onSubmit = (formData: FormData) => {

        const title = formData.get('title') as string;
        execute({ title })
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className='w-80 pt-3'
                side={side}
                sideOffset={sideOffset}
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Create Board
                </div>
                <PopoverClose className='bg-none border-none l' asChild>
                    <Button
                        className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
                        variant={'ghost'}
                        size={'icon'}
                    >
                        <X className='size-4' />
                    </Button>
                </PopoverClose>

                <form action={onSubmit} className='space-y-4'>
                    <div className='space-y-4'>
                        <FormInput
                            id='title'
                            label='Board Title'
                            type='text'
                            errors={FieldErrors}
                        />
                    </div>
                    <FormButton className='w-full'>
                        Create
                    </FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}
