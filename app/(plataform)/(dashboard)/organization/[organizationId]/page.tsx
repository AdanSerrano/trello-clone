import { OrganizationSwitcher } from '@clerk/nextjs'
import React from 'react'
import { auth } from '@clerk/nextjs/server'

export default function OrganizationIdPage() {
    const { userId, orgId } = auth()
    return (
        <div>
            Organization id
        </div>
    )
}
