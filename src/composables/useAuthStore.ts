import { reactive, toRefs } from 'vue'
import { User } from '@/helpers/auth'

interface AuthState {
    user: [] | null;
    isAuthenticated: boolean
}

const state = reactive<AuthState>({
    user: null,
    isAuthenticated: false
});

export function useAuth() {
    async function initializeAuth() {
        const tokenData: any | null = localStorage.getItem('token');
        if (tokenData) {
            const access_token = JSON.parse(tokenData);

            try {
                const response = await User.getUser(access_token);
                state.isAuthenticated = response.isAuthenticated;
                state.user = response.data;
            } catch (error) {
                console.log(error);
            }
        }
    }

    function setIsAuthenticated(value: boolean) {
        state.isAuthenticated = value;
        if (value === false) {
            localStorage.removeItem('token');
        }
        localStorage.setItem('isAuthenticated', JSON.stringify(value));
    }

    return {
        ...toRefs(state),
        initializeAuth,
        setIsAuthenticated
    }
}
