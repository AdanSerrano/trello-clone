import { OrgControl } from './_components/OrgControl'
import React from 'react'

export default function OrganizationIdLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    )
}
