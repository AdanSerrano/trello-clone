import { ActionState } from "@/lib/create-safe-actions";
import { Card } from "@prisma/client";
import { DeleteCard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType, Card>