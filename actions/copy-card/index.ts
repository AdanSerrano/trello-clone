'use server'

import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { InputType, ReturnType } from "./types"

import { CopyCard } from "./schema"
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
        const cardToCopy = await db.card.findUnique({
            where: {
                id,
                List: {
                    Board: {
                        orgId
                    }
                }
            }
        })

        if (!cardToCopy) {
            return { error: "Card not found" }
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId: cardToCopy.listId
            },
            orderBy: {
                order: 'desc'
            },
            select: {
                order: true
            }
        })

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title: `${cardToCopy.title} - Copy`,
                description: cardToCopy.description,
                order: newOrder,
                listId: cardToCopy.listId
            }
        })

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATED
        })
    } catch (error) {
        console.log(error)
        return { error: "Failed to delete List" }
    }

    revalidatePath(`/board/${boardId}`)
    return {
        data: card
    }
}

export const copyCard = createSafeAction(CopyCard, handler)