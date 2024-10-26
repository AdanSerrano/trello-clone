'use server'

import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { InputType, ReturnType } from "./types"

import { CreateList } from "./schema"
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


    const { title, boardId } = data;

    let list;

    try {
        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        })

        if (!board) {
            return {
                error: 'Board not Found'
            }
        }

        const findLastList = await db.list.findFirst({
            where: {
                boardId: boardId
            },
            orderBy: {
                order: 'desc'
            },
            select: {
                order: true
            }
        })

        const newOrder = findLastList ? findLastList.order + 1 : 1

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder
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
        return { error: "Failed to create List" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const createList = createSafeAction(CreateList, handler)