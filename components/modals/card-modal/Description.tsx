'use client'

import { AlignLeft, X } from 'lucide-react'
import React, { ElementRef, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import { CardWithList } from '@/types'
import { FormButton } from '@/components/form/FormButton'
import { FormTextarea } from '@/components/form/FormTextarea'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { updateCard } from '@/actions/update-card'
import { useAction } from '@/hooks/use-action'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

interface DescriptionProps {
    data: CardWithList
}

export const Description = ({
    data
}: DescriptionProps) => {
    const queryClient = useQueryClient()

    const { execute, FieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            });
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            });
            toast.success(`Card description ${data.description} update`)
            disabledEditing()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const params = useParams()

    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"form">>(null)
    const textareaRef = useRef<ElementRef<"textarea">>(null)

    const enabledEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        });
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
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        // TODO: excecute
        execute({
            id: data.id,
            description,
            boardId,
        })
    }

    return (
        <div className='flex items-start gap-x-3 w-full'>
            <AlignLeft className='size-5 mt-0.5 text-neutral-700' />
            <div className='w-full'>
                <p className='font-medium text-neutral-700 mb-2'>
                    Description
                </p>
                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className='space-y-2'
                    >
                        <FormTextarea
                            id='description'
                            errors={FieldErrors}
                            className='w-full mt-2'
                            placeholder='Add a more detailed description'
                            defaultValue={data.description || undefined}
                            ref={textareaRef}
                        />
                        <div className='flex items-center gap-x-2'>
                            <FormButton>
                                Save
                            </FormButton>
                            <Button
                                variant={'ghost'}
                                size={'icon'}
                                type='button'
                                onClick={disabledEditing}
                            >
                                <X className='size-4' />
                            </Button>
                        </div>
                    </form>
                ) : (

                    <div
                        onClick={enabledEditing}
                        role='button'
                        className='min-h-[78px] text-sm bg-neutral-200 font-medium px-3.5 py-3 rounded-md'
                    >
                        {data.description || 'Add a more detailed description...'}
                    </div>
                )}
            </div>
        </div >
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className='flex items-start gap-x-3'>
            <Skeleton className='size-6 bg-neutral-200' />
            <div className='w-full'>
                <Skeleton className='w-24 h-6 mb-2 bg-neutral-200' />
                <Skeleton className='w-full h-[76px] mb-2 bg-neutral-200' />
            </div>
        </div>
    )
}