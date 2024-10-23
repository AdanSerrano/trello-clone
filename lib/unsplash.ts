import { createApi } from 'unsplash-js'

if (!process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY) {
    console.error('Missing Unsplash API Key');
}

export const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
    fetch: fetch,
})