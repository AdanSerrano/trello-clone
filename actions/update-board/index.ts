'use server'

import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { InputType, ReturnType } from "./types"

import { UpdateBoard } from "./schema"
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


    const { title, id } = data;

    let board;

    try {
        board = await db.board.update({
            where: {
                id,
                orgId
            },
            data: {
                title: title
            }
        })

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.UPDATED
        })
    } catch (error) {
        console.log(error)
        return { error: "Failed to create Board" }
    }

    revalidatePath(`/board/${id}`)
    return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)