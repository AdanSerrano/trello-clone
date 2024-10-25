'use server'

import { InputType, ReturnType } from "./types"

import { UpdatedCardOrder } from "./schema"
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

    let updatedCards;

    try {
        const transations = items.map((card) =>
            db.card.update({
                where: {
                    id: card.id,
                    List: {
                        Board: {
                            orgId
                        }
                    }
                },
                data: {
                    order: card.order,
                    listId: card.listId
                }
            })
        )

        updatedCards = await db.$transaction(transations)
    } catch (error) {
        console.log(error)
        return { error: "Failed to reorder" }
    }

    revalidatePath(`/board/${boardId}`)
    return { data: updatedCards }
}

export const updatedCardOrder = createSafeAction(UpdatedCardOrder, handler)