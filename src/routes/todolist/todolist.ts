import express, { Request } from "express";
import TodoList from "../../database/models/todoList";
import auth from "../../middleware/auth";
import { AuthResponse } from "../../ts/interface/authResponse";
import { Op } from "sequelize";
import stripProperties from "../../helper/stripProperties";

const router = express.Router();

router.use(express.json());

export default function todolist(): express.Router {
    router.post("/create-todo-list", auth, async (req: Request, res: AuthResponse) => {
        const { id: userId } = res.locals.user;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Client failed to provide name property in json body."
            });
        }

        try {
            await TodoList.create({
                user_id: userId,
                title: name
            });
    
            return res.sendStatus(200);
        } catch (err: any) {
            return res.status(500).json({
                message: "Internal server error."
            });
        }
    });

    router.get("/get-todo-lists", auth, async (req, res: AuthResponse) => {
        const { id: userId } = res.locals.user;
        const limit: number = parseInt(req.query.limit as string) || 500;
        const offset: number = (
            parseInt(req.query.skip as string) ||
            parseInt(req.query.offset as string) ||
            0
        );
        const search: string = req.query.search as string;

        try {
            const todoListFindQuery = await TodoList.findAndCountAll({
                where: {
                    user_id: userId,
                    title: {
                        [Op.iLike]: `%${search || ""}%`
                    }
                },
                limit,
                offset,
                order: [["createdAt", "ASC"], ["id", "ASC"]]
            });

            const responseData: { count: number, rows: object[] } = {
                count: todoListFindQuery.count,
                rows: todoListFindQuery.rows.map((row) => {
                    return stripProperties(row.get(), "user_id") as Record<string, any>;
                })
            }
    
            return res.status(200).json(responseData);
        } catch (err: any) {
            return res.status(500).json({
                message: "Internal server error."
            });
        }
    });

    return router;
}
