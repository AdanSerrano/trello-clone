import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormStatus } from 'react-dom'

interface FormInputProps {
    errors?: {
        title?: string[]
    }
}

export const FormInput = ({ errors }: FormInputProps) => {
    const { pending } = useFormStatus()
    return (
        <div className='flex flex-col space-y-2'>
            <Input
                id='title'
                name='title'
                disabled={pending}
                required
                placeholder='Enter a board title'
            />
            {errors?.title && (
                <div>
                    {errors.title.map((error: string, index) => (
                        <p key={index} className='text-rose-500'>
                            {error}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}
