import { reactive, toRefs } from 'vue'
import { Auth } from '@/helpers/auth'

type User = {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    is_active: boolean;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
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
        const url: string = 'http://localhost/api/v1/users/login';
        const data = {
            email: email as string,
            password: password as string
        }
        const config = {
            withCredentials: true as boolean,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { isAuthenticated, user } = await Auth.login(url, data, config);

        if (isAuthenticated) {
            setIsAuthenticated(true);
            state.user = user;
            return true;
        }
        return false;
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
        setIsAuthenticated,
        loginUser
    }
}
