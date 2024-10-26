'use server'

import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { InputType, ReturnType } from "./types"

import { CreateCard } from "./schema"
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


    const { title, boardId, listId } = data;

    let card;

    try {
        const list = await db.list.findUnique({
            where: {
                id: listId,
                Board: {
                    orgId
                }
            }
        })

        if (!list) {
            return {
                error: 'List not found'
            }
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId
            },
            orderBy: {
                order: 'desc'
            },
            select: {
                order: true
            }
        });

        const newCard = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title,
                listId,
                order: newCard,
            }
        })

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATED
        })
    } catch (error) {
        console.log(error)
        return { error: "Failed to create List" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: card }
}

export const createCard = createSafeAction(CreateCard, handler)