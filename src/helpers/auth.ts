import axios from "axios";


export class Auth {

    public static async getUser(token: string) {
        return await axios.post('http://localhost/api/v1/users/validate_token', {
            access_token: token,
            token_type: "bearer"
        }).then((res) => {
            return {
                isAuthenticated: true,
                user: {
                    ...res.data
                }
            }
        }).catch((err) => {
            console.log(err.response.data)
            return { isAuthenticated: false, user: null };
        })
    }

    public static async login(data: any) {
        const url: string = 'http://localhost/api/v1/users/login';
        const config = {
            withCredentials: true as boolean,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return await axios.post(url, data, config).then((res) => {
            localStorage.setItem('token', JSON.stringify(res.data.access_token));
            return {
                isAuthenticated: true,
                user: {
                    ...res.data
                }
            }
        }).catch((err) => {
            console.log(err.response.data)
            return { isAuthenticated: false, user: null };
        })
    }

}