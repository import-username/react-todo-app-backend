import { Response } from "express";

export interface AuthResponse extends Response {
    locals: {
        user: {
            id: number
        }
    }
}