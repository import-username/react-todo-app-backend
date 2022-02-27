import type { NextFunction, Request, Response } from "express";
import EmailValidator from "email-validator";

export default function validateCredentials(req: Request, res: Response, next: NextFunction): void | Response {
    const { password, email } = req.body;

    if (!password) {
        return res.status(400).json({
            message: "Client failed to send password property in json body."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters."
        });
    }

    if (!email) {
        return res.status(400).json({
            message: "Client failed to send email property in json body."
        });
    }

    if (!EmailValidator.validate(email)) {
        return res.status(400).json({
            message: "Email could not be validated."
        });
    }

    return next();
}