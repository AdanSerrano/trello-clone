'use server'

import { InputType, ReturnType } from "./types"

import { DeleteBoard } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { createSafeAction } from "@/lib/create-safe-actions"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return { error: "Unauthorized" }
    }


    const { id } = data;

    let board;

    try {
        board = await db.board.delete({
            where: {
                id,
                orgId
            }
        })

    } catch (error) {
        console.log(error)
        return { error: "Failed to delete Board" }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)