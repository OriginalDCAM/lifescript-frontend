import { reactive, toRefs } from 'vue'
import { Auth } from '@/helpers/auth'
import type { AuthState } from '@/types/User';

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
                const { isAuthenticated, user } = await Auth.getUser(access_token);
                // Make logic so it maybe refreshes the token if it's expired
                if (!isAuthenticated) {
                    setIsAuthenticated(false);
                    return false;
                }
                state.isAuthenticated = isAuthenticated;
                state.user = user;
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
    async function loginUser(email: string, password: string) {
        const data = {
            email: email as string,
            password: password as string
        }


        const { isAuthenticated, user } = await Auth.login(data);

        if (isAuthenticated) {
            setIsAuthenticated(true);
            state.user = user;
            return { isAuthenticated }
        }
        return { status: 404, message: "User not found" };
    }

    function setIsAuthenticated(value: boolean) {
        state.isAuthenticated = value;
        if (value === false) {
            localStorage.removeItem('token');
        }
    }

    return {
        ...toRefs(state),
        initializeAuth,
        setIsAuthenticated,
        loginUser
    }
}
