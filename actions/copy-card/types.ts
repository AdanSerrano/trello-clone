import { ActionState } from "@/lib/create-safe-actions";
import { Card } from "@prisma/client";
import { CopyCard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>