import express from "express";
import type { Router } from "express";
import User from "../../database/models/user";
import bcrypt from "bcrypt";
import validateCredentials from "./validateCredentials";

const router: Router = express.Router();

export default function signup(): Router {
    router.post("/", validateCredentials, async (req, res) => {
        try {
            const userFindQuery = await User.findOne({ where: { email: req.body.email } });
    
            if (userFindQuery) {
                return res.status(400).json({
                    message: "User with that email already exists."
                });
            }
    
            bcrypt.hash(req.body.password, 10, (err: Error | undefined, hash: string) => {
                if (err) {
                    return res.status(500).json({
                        message: "Internal server error."
                    });
                }
                
                try {
                    User.create({
                        email: req.body.email,
                        password: hash
                    });

                    return res.sendStatus(200);
                } catch (exc) {
                    return res.status(500).json({
                        message: "Internal server error."
                    });
                }
            });
        } catch (exc) {
            return res.status(500).json({
                message: "Internal server error."
            });
        }
    });

    return router;
}