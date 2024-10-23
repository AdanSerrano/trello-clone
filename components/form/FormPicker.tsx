'use client'

import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { FormErrors } from './FormErrors';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { defaultImages } from '@/constant/images';
import { unsplash } from '@/lib/unsplash'
import { useFormStatus } from 'react-dom';

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({
    id,
    errors
}: FormPickerProps) => {
    const { pending } = useFormStatus()
    const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedImageId, setSelectedImageId] = useState(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9
                })

                if (result && result.response) {
                    const newImages = (result.response as Array<Record<string, any>>)
                    setImages(newImages)
                } else {
                    console.error('Failed to get images from unsplash')
                }

            } catch (error) {
                console.log(error)
                setImages(defaultImages)
            } finally {
                setIsLoading(false)
            }
        }
        fetchImages()
    }, [])

    if (isLoading) {
        return (
            <div className='p-6 flex items-center justify-center'>
                <Loader2 className='animate-spin size-4 text-sky-700' />
            </div>
        )
    }

    return (
        <div className='relative'>
            <div className='grid grid-cols-3 gap-2 mb-2'>
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={cn(
                            'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
                            pending && 'opacity-50 hover:opacity-50 cursor-auto',
                            selectedImageId === image.id && 'ring-2 ring-blue-200 rounded-sm'
                        )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id)
                        }}
                    >
                        <input
                            type='radio'
                            id={id}
                            name={id}
                            className='hidden'
                            checked={selectedImageId === image.id}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image
                            src={image.urls.thumb}
                            alt='Unsplash Images'
                            className='object-cover rounded-sm'
                            fill
                            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 33vw, 33vw"
                            priority
                        />
                        {selectedImageId === image.id && (
                            <div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
                                <Check className='size-4 text-white' />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target='_blank'
                            className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate bg-black/50 text-white hover:underline p-1'
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors id='image' errors={errors} />
        </div>
    )
}