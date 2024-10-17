import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom'

export const FormDeleteButton = () => {
    const { pending } = useFormStatus()
    return (
        <Button
            type='submit'
            size={'sm'}
            variant={'destructive'}
            disabled={pending}
        >
            Delete Board
        </Button>
    )
}
