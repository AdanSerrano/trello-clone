'use server'

import { InputType, ReturnType } from "./types"

import { UpdateBoard } from "./schema"
import { auth } from "@clerk/nextjs/server"
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

    } catch (error) {
        console.log(error)
        return { error: "Failed to create Board" }
    }

    revalidatePath(`/board/${id}`)
    return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)