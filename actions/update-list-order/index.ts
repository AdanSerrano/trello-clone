'use server'

import { InputType, ReturnType } from "./types"

import { UpdateListOrder } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { createSafeAction } from "@/lib/create-safe-actions"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }


    const { items, boardId } = data;

    let lists;

    try {
        const transations = items.map((list) =>
            db.list.update({
                where: {
                    id: list.id,
                    Board: {
                        orgId
                    }
                },
                data: {
                    order: list.order
                }
            })
        )

        lists = await db.$transaction(transations)
    } catch (error) {
        console.log(error)
        return { error: "Failed to reorder" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: lists }
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)