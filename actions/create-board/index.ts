'use server'

import { InputType, ReturnType } from "../create-board/types"

import { CreateBoard } from "./schema"
import { auth } from "@clerk/nextjs/server"
import { createSafeAction } from "@/lib/create-safe-actions"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth()
    if (!userId || !orgId) {
        return {
            error: "Unathorized"
        }
    }

    const { title, image } = data;
    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
    ] = image.split('|')

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: 'Missing field. Failed to create board'
        }
    }


    let board;
    try {
        board = await db.board.create({
            data: {
                orgId,
                title,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName
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