import { ActionState } from "@/lib/create-safe-actions";
import { Card } from "@prisma/client";
import { UpdatedCardOrder } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof UpdatedCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>