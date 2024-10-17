import { validateHeaderName } from "http";
import { z } from "zod";

export type FieldErrors<T> = {
    [K in keyof T]?: string[];
}

export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
}

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
    return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
        const valdidateResult = schema.safeParse(data);
        if (!valdidateResult.success) {
            return {
                fieldErrors: valdidateResult.error.flatten().fieldErrors as FieldErrors<TInput>
            }
        };
        return handler(valdidateResult.data)
    }
}