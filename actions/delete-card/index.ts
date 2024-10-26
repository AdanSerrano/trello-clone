'use server'

import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { InputType, ReturnType } from "./types"

import { DeleteCard } from "./schema"
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


    const { id, boardId } = data;

    let card;

    try {
        card = await db.card.delete({
            where: {
                id,
                List: {
                    Board: {
                        orgId
                    }
                }
            }
        })

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.DELETED
        })
    } catch (error) {
        console.log(error)
        return { error: "Failed to delete" }
    }

    revalidatePath(`/board/${boardId}`)
    return {
        data: card
    }
}

export const deleteCard = createSafeAction(DeleteCard, handler)