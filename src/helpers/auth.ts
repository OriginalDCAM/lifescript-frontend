import type { IUser } from "@/types/User";
import axios from "axios";

export class User implements IUser {
    public email: string;
    public username: string;
    public firstname: string;
    public authenticated: boolean;
    public token: string;

    constructor(email: string, username: string, firstname: string, authenticated: boolean, token: string) {
        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.authenticated = authenticated;
        this.token = token;
    }

    public async isAuthenticated() {
        return await axios.post('http://localhost/api/v1/users/validate_token', {
            access_token: this.token,
            token_type: "bearer"
        }).then(() => {
            console.log(`${this.username} is authenticated`)
            return true;
        }).catch((err) => {
            console.log(err.response.data)
            return false;
        })
    }

    public async getCurrentUser() {
        return await axios.post('http://localhost/api/v1/users/validate_token', {
            access_token: this.token,
            token_type: "bearer"
        }).then(() => {
            return true;
        }).catch((err) => {
            console.log("Why doenst this work?");
            return false;
        })
    }
}