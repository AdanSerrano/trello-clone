'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { FormButton } from './FormButton'
import { FormInput } from './FormInput'
import React from 'react'
import { createBoard } from '@/actions/create-board'
import { useAction } from '@/hooks/use-action'

export const Form = () => {
    const { execute, FieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log(data, 'Success...')
        },
        onError: (error) => {
            console.log(error, 'ERROR')
        }
    })
    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        execute({ title })
    }
    return (
        <form action={onSubmit}>
            <FormInput errors={FieldErrors} />
            <FormButton />
        </form>
    )
}
