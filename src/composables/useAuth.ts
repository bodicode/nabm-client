
export const useAuth = () => {
    const user = useState<any | null>('user', () => null)
    const token = useState<string | null>('token', () => null)

    const setToken = (newToken: string | null) => {
        console.log('setToken called with:', newToken ? 'Token exists' : 'null')
        token.value = newToken
        if (newToken) {
            localStorage.setItem('auth_token', newToken)
        } else {
            localStorage.removeItem('auth_token')
        }
    }

    const fetchUser = async () => {
        if (!token.value) return
        const config = useRuntimeConfig()

        try {
            const data = await $fetch<any>('/users/me', {
                baseURL: config.public.apiBase,
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            })
            user.value = data
        } catch (e) {
            console.error('Error fetching user', e)
            logout()
        }
    }

    const logout = () => {
        user.value = null
        setToken(null)
        navigateTo('/login')
    }

    const initAuth = async () => {
        if (process.client) {
            const storedToken = localStorage.getItem('auth_token')
            console.log('initAuth: storedToken', storedToken)
            if (storedToken) {
                token.value = storedToken
                try {
                    await fetchUser()
                } catch (e) {
                    console.error('initAuth failed', e)
                }
            }
        }
    }

    return {
        user,
        token,
        setToken,
        fetchUser,
        logout,
        initAuth
    }
}
