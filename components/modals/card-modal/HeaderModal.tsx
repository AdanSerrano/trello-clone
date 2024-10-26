'use client'

import React, { ElementRef, useRef, useState } from 'react'

import { CardWithList } from '@/types'
import { FormInput } from '@/components/form/FormInput'
import { Layout } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { updateCard } from '@/actions/update-card'
import { useAction } from '@/hooks/use-action'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

interface HeaderModalProps {
    data: CardWithList
}

export const HeaderModal = ({
    data
}: HeaderModalProps) => {
    const queryClient = useQueryClient()
    const params = useParams()
    const inputRef = useRef<ElementRef<"input">>(null)

    const { execute } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            })
            toast.success(`Rename to "${data.title}"`)
            setTitle(data.title)
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const [title, setTitle] = useState(data?.title)

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit()
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = params.boardId as string;

        if (title === data.title) return;

        execute({
            title,
            boardId,
            id: data.id,
        })
    }

    return (
        <div className='flex items-start gap-x-3 mb-6 w-full'>
            <Layout className='size-5 mt-1 text-neutral-700' />
            <div className='w-full'>
                <form action={onSubmit}>
                    <FormInput
                        onBlur={onBlur}
                        ref={inputRef}
                        id='title'
                        defaultValue={title}
                        className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate'
                    />
                </form>
                <p className='text-sm text-muted-foreground'>
                    in list <span className='underline'>{data.List.title}</span>
                </p>
            </div>
        </div>
    )
}

HeaderModal.Skeleton = function HeaderSkeleton() {
    return (
        <div className='flex items-start gap-x-3 mb-6'>
            <Skeleton className='size-6 mt-1 bg-neutral-200' />
            <div className='w-full'>
                <Skeleton className='w-24 h-6 mt-1 bg-neutral-200' />
                <Skeleton className='w-12 h-4 bg-neutral-200' />
            </div>
        </div>
    )
}