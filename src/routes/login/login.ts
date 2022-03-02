import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";
import dotenv from "dotenv";
dotenv.config();

const router: Router = Router();

export default function login(): Router {
    router.post("/", async (req, res) => {
        try {
            const { email, password }: { [all: string]: string } = req.body;
            
            if (!email || !password) {
                return res.status(400).json({
                    message: "Invalid email or password."
                });
            }
            
            const userFindQuery = await User.findOne({
                where: {
                    email: email
                }
            });
             
            if (!userFindQuery) {
                return res.status(400).json({
                    message: "User does not exist."
                });
            }
            
            const { password: hashedPassword }: { password: string } = userFindQuery.get();
            
            const compareHash = await bcrypt.compare(password, hashedPassword);
            
            if (compareHash) {
                const accessToken: string = jwt.sign({ email: email }, <string> process.env.JWT_SECRET);
                
                return res.status(200).cookie("auth_cookie", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production"
                }).json({
                    message: "Successfully logged in."
                });
            }

            return res.status(400).json({
                message: "Invalid email or password."
            });
        } catch (exc) {
            return res.status(500).json({
                message: "Internal server error."
            });
        }
    });
    
    return router;
}