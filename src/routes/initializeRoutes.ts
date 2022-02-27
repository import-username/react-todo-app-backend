import type { Application } from "express";
import signup from "./signup/signup";

export default function initializeRoutes(app: Application): void {
    app.use("/signup", signup());
}