import { z } from "zod";

export const UpdateList = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3, {
        message: "Tittle is too short"
    }),
    id: z.string(),
    boardId: z.string()
})