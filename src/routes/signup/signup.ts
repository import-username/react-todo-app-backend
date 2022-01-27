import express from "express";
import type { Router } from "express";

const router: Router = express.Router();

export default function signup(): Router {
    router.post("/", (req, res) => {
        if (!req.body.email) {
            return res.status(401).json({
                message: "Invalid email address."
            });
        }

        if (!req.body.password || req.body.password.length < 8) {
            return res.status(401).json({
                message: "Password must be at least 8 characters."
            });
        }

        
    });

    return router;
}