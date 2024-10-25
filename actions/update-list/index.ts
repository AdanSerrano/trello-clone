'use server'

import { InputType, ReturnType } from "./types"

import { UpdateList } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { createSafeAction } from "@/lib/create-safe-actions"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }


    const { title, id, boardId } = data;

    let list;

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
                Board: {
                    orgId
                }
            },
            data: {
                title
            }
        })

    } catch (error) {
        console.log(error)
        return { error: "Failed to create Board" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: list }
}

export const updateList = createSafeAction(UpdateList, handler)