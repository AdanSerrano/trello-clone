'use server'

import { InputType, ReturnType } from "./types"

import { CreateBoard } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { createSafeAction } from "@/lib/create-safe-actions"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth()
    if (!userId) {
        return {
            error: "Unathorized"
        }
    }

    const { title } = data;
    let board;
    try {
        board = await db.board.create({
            data: {
                title,
            }
        })
    } catch (error) {
        return {
            error: "Failed to create board"
        }
    }
    revalidatePath(`/board/${board.id}`)
    return {
        data: board
    }
}

export const createBoard = createSafeAction(CreateBoard, handler)


export const DeleteBoard = async (id: string) => {
    try {
        await db.board.delete({
            where: {
                id
            }
        })
    } catch (error) {
        console.log(error)
    }
    revalidatePath(`${process.env.NEXT_PUBLIC_URL}/organization/org_2nGl5h8ZIMjZiiyanOQ3jOybvov`)
}