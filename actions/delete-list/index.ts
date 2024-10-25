'use server'

import { InputType, ReturnType } from "./types"

import { DeleteList } from "./schema"
import { auth } from "@clerk/nextjs/server"
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
        list = await db.list.delete({
            where: {
                id,
                boardId,
                Board: {
                    orgId
                }
            }
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

export const deleteList = createSafeAction(DeleteList, handler)