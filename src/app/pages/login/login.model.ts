import { User } from "../user/user.model";

export interface Login {
    token: string,
    user: User
}

export interface Logout {
    token: boolean
}