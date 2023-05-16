import { reactive, toRefs } from 'vue'
import { User } from '@/helpers/auth'

interface AuthState {
    user: User | null;
    isAuthenticated: boolean
}

const state = reactive<AuthState>({
    user: null,
    isAuthenticated: false
});

export function useAuth() {
    async function  initializeAuth() {
        const tokenData: any | null = localStorage.getItem('token');
        if (tokenData) {
            const tokenJsonData = JSON.parse(tokenData);
            const user = new User(
                tokenJsonData['email'],
                tokenJsonData['username'],
                tokenJsonData['firstname'],
                tokenJsonData['authenticated'],
                tokenJsonData['token']
                );
            state.user = user;
            state.isAuthenticated = await user.getCurrentUser();
        }
    }

    return {
        ...toRefs(state),
        initializeAuth
    }
}
