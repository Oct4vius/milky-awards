import { User } from "../../../interfaces/user.interfaces";

export interface LoginResponse {
    user:  User;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export type RegisterPayloadType = {
    username: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    newUser: User;
    token:   string;
}
