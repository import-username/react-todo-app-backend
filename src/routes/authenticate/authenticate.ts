import { Router } from "express";
import auth from "../../middleware/auth";

const router: Router = Router();

export default function authenticate(): Router {
    router.get("/", auth, (req, res) => {
        return res.sendStatus(200);
    });

    return router;
}
