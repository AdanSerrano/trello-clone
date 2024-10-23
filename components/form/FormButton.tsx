'use client'

import { Button } from '@/components/ui/button';
import React from 'react'
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary'
}

export const FormButton = ({
    children,
    disabled,
    className,
    variant = 'default'
}: FormButtonProps) => {
    const { pending } = useFormStatus()
    return (
        <Button
            variant={variant}
            disabled={disabled || pending}
            className={cn(
                '',
                className
            )}
            size={'sm'}
            type='submit'
        >
            {children}
        </Button>
    )
}
