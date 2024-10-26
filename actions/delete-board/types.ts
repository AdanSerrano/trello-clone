import { ActionState } from "@/lib/create-safe-actions";
import { Board } from "@prisma/client";
import { DeleteBoard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>