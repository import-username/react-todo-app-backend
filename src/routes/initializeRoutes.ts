import type { Application } from "express";
import authenticate from "./authenticate/authenticate";
import login from "./login/login";
import signup from "./signup/signup";

export default function initializeRoutes(app: Application): void {
    app.use("/signup", signup());
    app.use("/login", login());
    app.use("/authenticate", authenticate());
}