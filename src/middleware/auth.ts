import { Response, NextFunction, RequestHandler, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthResponse } from "../ts/interface/authResponse";
dotenv.config();

export default function auth(req: Request, res: AuthResponse, next: NextFunction): Response | void {
    if (req.cookies && req.cookies["auth_cookie"]) {
        const token: string = req.cookies["auth_cookie"];

        jwt.verify(token, <string> process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error."
                });
            }

            res.locals.user = {
                id: (decoded as JwtPayload).user_id
            }

            return next();
        });
    } else {
        return res.sendStatus(401);
    }
}
