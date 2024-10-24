import { ActionState } from "@/lib/create-safe-actions";
import { Board } from "@prisma/client";
import { UpdateBoard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>