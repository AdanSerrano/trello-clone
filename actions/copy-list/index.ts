'use server'

import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { InputType, ReturnType } from "./types"

import { CopyList } from "./schema"
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

    let list;

    try {
        const listCopy = await db.list.findUnique({
            where: {
                id,
                boardId,
                Board: {
                    orgId
                }
            },
            include: {
                Card: true
            }
        });

        if (!listCopy) {
            return { error: 'list not found' }
        };

        const lastList = await db.list.findFirst({
            where: {
                boardId
            },
            orderBy: {
                order: 'desc'
            },
            select: {
                order: true
            }
        });

        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                boardId: listCopy.boardId,
                title: `${listCopy.title} - Copy`,
                order: newOrder,
                Card: {
                    createMany: {
                        data: listCopy.Card.map((card) => ({
                            title: card.title,
                            description: card.description,
                            order: card.order,
                        }))
                    }
                }
            },
            include: {
                Card: true
            }
        })
        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATED
        })
    } catch (error) {
        console.log(error)
        return { error: "Failed to delete List" }
    }

    revalidatePath(`/board/${boardId}`)
    return {
        data: list
    }
}

export const copyList = createSafeAction(CopyList, handler)