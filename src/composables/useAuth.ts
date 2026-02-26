
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

    const updateProfile = async (profileData: any) => {
        if (!token.value) return false
        const config = useRuntimeConfig()

        try {
            await $fetch('/users/profile', {
                method: 'PATCH',
                baseURL: config.public.apiBase,
                headers: {
                    Authorization: `Bearer ${token.value}`
                },
                body: profileData
            })
            // Fetch the updated user data
            await fetchUser()
            return true
        } catch (e) {
            console.error('Error updating profile', e)
            throw e
        }
    }

    const changePassword = async (currentPassword: string, newPassword: string) => {
        if (!token.value) return false
        const config = useRuntimeConfig()

        try {
            await $fetch('/users/change-password', {
                method: 'PATCH',
                baseURL: config.public.apiBase,
                headers: {
                    Authorization: `Bearer ${token.value}`
                },
                body: { currentPassword, newPassword }
            })
            return true
        } catch (e) {
            console.error('Error changing password', e)
            throw e
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
        initAuth,
        updateProfile,
        changePassword
    }
}
