'use server'

import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { InputType, ReturnType } from "./types"

import { UpdateCard } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { createAuditLog } from "@/lib/create-audit-log"
import { createSafeAction } from "@/lib/create-safe-actions"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }


    const { id, boardId, ...values } = data;

    let card;

    try {
        card = await db.card.update({
            where: {
                id,
                List: {
                    Board: {
                        orgId
                    }
                }
            },
            data: {
                ...values
            }
        })

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.UPDATED
        })
    } catch (error) {
        console.log(error)
        return { error: "Failed to update card" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const updateCard = createSafeAction(UpdateCard, handler)