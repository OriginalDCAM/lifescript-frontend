import type { IUser } from "@/types/User";
import axios from "axios";

export class User {

    public static async getUser(token: string) {
        return await axios.post('http://localhost/api/v1/users/validate_token', {
            access_token: token,
            token_type: "bearer"
        }).then((res) => {
            console.log(res.data)
            return { isAuthenticated: true, ...res.data }
        }).catch((err) => {
            console.log(err.response.data)
            return false;
        })
    }

}