import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { FormPopover } from '@/components/form/FormPopover'
import { Logo } from '@/components/Logo'
import { MobileSidebar } from './MobileSidebar'
import { Plus } from 'lucide-react'
import React from 'react'

export const Navbar = () => {
    return (
        <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
            {/* TODO: Mobile sidebar */}
            <MobileSidebar />
            <div className='flex items-center gap-x-4'>
                <div className='hidden md:flex'>
                    <Logo />
                </div>
                <FormPopover align='start' side='bottom' sideOffset={18}>
                    <Button variant={'primary'} size={'sm'} className='rounded-sm hidden md:block h-auto py-1.5 px-2'>
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button variant={'primary'} size={'sm'} className='rounded-sm block md:hidden'>
                        <Plus className='size-4' />
                    </Button>
                </FormPopover>
            </div>
            <div className='flex items-center gap-x-2 ml-auto'>
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl={'/organization/:id'}
                    afterSelectOrganizationUrl={'/organization/:id'}
                    afterLeaveOrganizationUrl='/select-org'
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }
                        }
                    }}
                />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: {
                                width: 30,
                                height: 30,
                            }
                        }
                    }}
                />
            </div>
        </nav>
    )
}
