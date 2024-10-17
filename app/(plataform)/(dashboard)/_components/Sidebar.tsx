'use client'

import { NavItem, Organization } from './NavItem'
import { useOrganization, useOrganizationList } from '@clerk/nextjs'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocalStorage } from 'usehooks-ts'

interface SidebarProps {
    storageKey?: string
}

export const Sidebar = ({
    storageKey = 't-sidebar-state'
}: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {})

    const {
        organization: activeOrganization,
        isLoaded: isLoadedOrg,
    } = useOrganization()

    const {
        userMemberships,
        isLoaded: isLoadedOrgList
    } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    const defaultAccordionValue: string[] = Object.keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key)
            }
            return acc
        }, [])

    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id]
        }))
    }

    if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <Skeleton className='h-full' />
            </>
        )
    }

    return (
        <>
            <div className='font-medium text-xs flex items-center mb-1'>
                <span className='pl-4'>
                    WorkSpace
                </span>
                <Button
                    asChild
                    type='button'
                    size={'icon'}
                    variant={'ghost'}
                    className='ml-auto'
                >
                    <Link
                        href={'/select-org'}
                    >
                        <Plus className='size-4' />
                    </Link>
                </Button>
            </div>
            <Accordion
                type='multiple'
                defaultValue={defaultAccordionValue}
                className='space-y-2'
            >
                {userMemberships.data.map((org) => (
                    <NavItem
                        key={org.organization.id}
                        isActive={activeOrganization?.id === org.organization.id}
                        isExpanded={expanded[org.organization.id]}
                        organization={org.organization as Organization}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    )
}