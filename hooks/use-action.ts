import { ActionState, FieldErrors } from "@/lib/create-safe-actions";
import { use, useCallback, useState } from "react";

type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

interface UseActionProps<TOutput> {
    onSuccess?: (data: TOutput) => void
    onError?: (data: string) => void
    onComplete?: () => void
}

export const useAction = <TInput, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionProps<TOutput> = {}
) => {
    const [FieldErrors, setFieldErrors] = useState<FieldErrors<TInput | undefined>>(undefined);
    const [error, setError] = useState<string | undefined>(undefined)
    const [data, setData] = useState<TOutput | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const execute = useCallback(
        async (input: TInput) => {
            setIsLoading(true)

            try {
                const result = await action(input)
                if (!result) return null

                if (result.fieldErrors) setFieldErrors(result.fieldErrors)

                if (result.error) {
                    setError(result.error)
                    options.onError?.(result.error)
                }

                if (result.data) {
                    setData(result.data)
                    options.onSuccess?.(result.data)
                }
            } finally {
                setIsLoading(false)
                options.onComplete?.()
            }
        }, [action, options]
    )

    return {
        execute,
        FieldErrors,
        error,
        data,
        isLoading
    };
}; 