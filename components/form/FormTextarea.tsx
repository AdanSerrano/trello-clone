'use client'

import React, { KeyboardEventHandler, forwardRef } from 'react'

import { FormErrors } from './FormErrors';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
    id,
    label,
    placeholder,
    required,
    disabled,
    errors,
    className,
    onBlur,
    onClick,
    onKeyDown,
    defaultValue
}, ref) => {
    const { pending } = useFormStatus()
    return (
        <div className='space-y-2 w-full'>
            <div className='space-y-1 w-full'>
                {label && (
                    <Label
                        htmlFor={id}
                        className='text-xs font-medium text-neutral-700'
                    >
                        {label}
                    </Label>
                )}
                <Textarea
                    onKeyDown={onKeyDown}
                    onBlur={onBlur}
                    onClick={onClick}
                    ref={ref}
                    required={required}
                    placeholder={placeholder}
                    disabled={disabled || pending}
                    name={id}
                    id={id}
                    className={cn(
                        "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
                        className
                    )}
                    aria-describedby={`${id}-error`}
                    defaultValue={defaultValue}
                />
                <FormErrors
                    id={id}
                    errors={errors}
                />
            </div>
        </div>
    )
}
)

FormTextarea.displayName = 'FormTextArea'