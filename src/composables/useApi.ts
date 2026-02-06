import { type UseFetchOptions } from 'nuxt/app'

export const useApi = <T>(url: string, options?: any) => {
    const config = useRuntimeConfig()
    const { token } = useAuth()

    const headers = {
        ...options?.headers,
    }

    if (token.value) {
        headers['Authorization'] = `Bearer ${token.value}`
    }

    return useFetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options,
        headers
    })
}
