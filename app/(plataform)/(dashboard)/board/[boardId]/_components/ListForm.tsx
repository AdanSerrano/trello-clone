'use client'

import { Plus, X } from 'lucide-react'
import React, { ElementRef, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { FormButton } from '@/components/form/FormButton'
import { FormInput } from '@/components/form/FormInput'
import { ListWrapper } from './ListWrapper'
import { createList } from '@/actions/create-list'
import { toast } from 'sonner'
import { useAction } from '@/hooks/use-action'

export const ListForm = () => {
    const router = useRouter()
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const { execute, FieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`List ${data.title} created.`)
            disabledEditing();
            router.refresh()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const [isEditing, setIsEditing] = useState(false)

    const enabledEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 3000);
    }

    const disabledEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disabledEditing()
        }
    }

    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disabledEditing)

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({ title, boardId })
    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
                >
                    <FormInput
                        ref={inputRef}
                        id='title'
                        className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition'
                        errors={FieldErrors}
                        placeholder='Please list title...'
                    />
                    <input
                        hidden
                        value={params.boardId}
                        name='boardId'
                    />
                    <div className='flex items-center gap-x-1'>
                        <FormButton                        >
                            Add List
                        </FormButton>
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            onClick={disabledEditing}
                        >
                            <X className='size-5' />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <button
                className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm text-black'
                onClick={enabledEditing}
            >
                <Plus className='size-4 mr-2' />
                Add List
            </button>
        </ListWrapper>
    )
}
