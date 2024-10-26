'use client'

import React, { ElementRef, useRef, useState } from 'react'

import { Board } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/form/FormInput';
import { createBoard } from '@/actions/create-board';
import { toast } from 'sonner';
import { updateBoard } from '@/actions/update-board';
import { useAction } from '@/hooks/use-action';

interface BoardTitleFormProps {
    data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Board "${data?.title} update`)
            setTitle(data.title)
            disabledEditing()
        },
        onError: (error) => {
            toast.error(`${error}`)
        }
    })
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(data.title)

    const enabledEditing = () => {
        //TODO: FOCUS INPUT
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select()
        });
    }

    const disabledEditing = () => {
        setIsEditing(false)
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;

        if (title === data.title) return;

        execute({ title, id: data.id })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    if (isEditing) {
        return (
            <form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
                <FormInput
                    ref={inputRef}
                    id='title'
                    onBlur={onBlur}
                    defaultValue={title}
                    className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none'
                />
            </form>
        )
    }

    return (
        <Button
            onClick={enabledEditing}
            className='font-bold text-lg h-auto w-auto p-1 px-2'
            variant={'transparent'}
        >
            {title}
        </Button>
    )
}
