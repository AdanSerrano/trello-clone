'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'

import { Actions } from './Actions'
import { Activity } from './Activity'
import { AuditLog } from '@prisma/client'
import { CardWithList } from '@/types'
import { Description } from './Description'
import { HeaderModal } from './HeaderModal'
import React from 'react'
import { fetcher } from '@/lib/fetcher'
import { useCardModal } from '@/hooks/use-card-modal'
import { useQuery } from '@tanstack/react-query'

export const CardModal = () => {

    const { id, isOpen, onClose } = useCardModal()

    const { data: dataCard } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`)
    })

    const { data: dataAuditLog } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`)
    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {!dataCard ? (
                    <HeaderModal.Skeleton />
                ) : (
                    <HeaderModal data={dataCard} />
                )}
                <div className='grid grid-cols-1 md:grid-cols-4 md:gap-4'>
                    <div className='col-span-3'>
                        <div className='w-full space-y-6'>
                            {!dataCard ? (
                                <Description.Skeleton />
                            ) : (
                                <Description data={dataCard} />
                            )}
                            {!dataAuditLog ? (
                                <Activity.Skeleton />
                            ) : (
                                <Activity items={dataAuditLog} />
                            )}
                        </div>
                    </div>
                    {!dataCard
                        ? <Actions.Skeleton />
                        : <Actions data={dataCard} />
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}


