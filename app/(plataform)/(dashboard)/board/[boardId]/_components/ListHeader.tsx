'use client'

import React, { ElementRef, useRef, useState } from 'react'

import { FormInput } from '@/components/form/FormInput'
import { List } from '@prisma/client'
import { ListOptions } from './ListOptions'
import { ListWithCard } from '@/types'
import { toast } from 'sonner'
import { updateList } from '@/actions/update-list'
import { useAction } from '@/hooks/use-action'
import { useEventListener } from 'usehooks-ts'

interface ListHeaderProps {
    data: List
}

export const ListHeader = ({
    data
}: ListHeaderProps) => {
    const [title, setTitle] = useState(data.title)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const enabledEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    }


    const disabledEditing = () => {
        setIsEditing(false)
    }

    const { execute, FieldErrors } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Update ${data.title} succestly`)
            setTitle(data.title)
            disabledEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;
        const id = formData.get("id") as string;
        if (title === data.title) {
            disabledEditing()
        }
        execute({
            id,
            boardId,
            title
        })
    }

    const onBlur = () => {
        formRef.current?.requestSubmit()
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.requestSubmit()
            setIsEditing(false)
        }
    }

    useEventListener("keydown", onKeyDown)

    return (
        <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
            {isEditing ? (
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className='flex-1 px-[2px]'
                >
                    <input hidden id='id' name='id' value={data.id} />
                    <input hidden id='boardId' name='boardId' value={data.boardId} />
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id='title'
                        placeholder='Enter List title...'
                        defaultValue={title}
                        errors={FieldErrors}
                        className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
                    />
                    <button type='submit' hidden />
                </form>
            ) : (
                <div
                    onClick={enabledEditing}
                    className='w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent'
                >
                    {title}
                </div>
            )}
            <ListOptions
                addOnCard={() => { }}
                data={data}
            />
        </div>
    )
}
