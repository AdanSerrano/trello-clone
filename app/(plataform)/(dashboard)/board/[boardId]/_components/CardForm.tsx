import { Plus, X } from 'lucide-react';
import React, { ElementRef, KeyboardEventHandler, RefObject, forwardRef, useRef } from 'react'
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { FormButton } from '@/components/form/FormButton';
import { FormTextarea } from '@/components/form/FormTextarea';
import { Textarea } from '@/components/ui/textarea';
import { createCard } from '@/actions/create-card';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';
import { useParams } from 'next/navigation';

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enabledEditing: () => void;
    disabledEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    isEditing,
    enabledEditing,
    disabledEditing
}, ref) => {
    const params = useParams()
    const formRef = useRef<ElementRef<"form">>(null)

    const { execute, FieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Create ${data.title} card `)
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disabledEditing()
        }
    }

    useOnClickOutside(formRef, disabledEditing)
    useEventListener("keydown", onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            formRef.current?.requestSubmit()
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = params.boardId as string;
        const listId = formData.get("listId") as string;

        execute({
            title,
            boardId,
            listId
        })
    }

    if (isEditing) {
        return (
            <form
                action={onSubmit}
                ref={formRef}
                className='m-1 py-0.5 px-1 space-y-4'
            >
                <FormTextarea
                    id='title'
                    placeholder='Enter a title for this card...'
                    onKeyDown={onTextareaKeyDown}
                    ref={ref}
                    errors={FieldErrors}
                />
                <input
                    hidden
                    id='listId'
                    name='listId'
                    value={listId}
                />
                <div className='flex items-center gap-x-1'>
                    <FormButton>
                        Add card
                    </FormButton>
                    <Button onClick={disabledEditing} size={'icon'} variant={'ghost'}>
                        <X className='size-4' />
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className='pt-2 px-2'>
            <Button
                onClick={enabledEditing}
                className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
                size={'sm'}
                variant={'ghost'}
            >
                <Plus className='size-4 mr-2' />
                Add a card
            </Button>
        </div>
    )
})

CardForm.displayName = 'CardForm'
