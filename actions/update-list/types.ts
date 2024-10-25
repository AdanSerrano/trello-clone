import { ActionState } from "@/lib/create-safe-actions";
import { List } from "@prisma/client";
import { UpdateList } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputType, List>