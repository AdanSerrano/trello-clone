import { Card, List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-actions";
import { CreateCard } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>