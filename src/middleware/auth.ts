import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function auth(req: Request, res: Response, next: NextFunction): Response | void {
    if (req.cookies && req.cookies["auth_cookie"]) {
        const token: string = req.cookies["auth_cookie"];

        jwt.verify(token, <string> process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error."
                });
            }

            return next();
        });
    } else {
        return res.sendStatus(401);
    }
}