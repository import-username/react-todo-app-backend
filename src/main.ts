import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import initializeRoutes from "./routes/initializeRoutes";
dotenv.config();

const PORT: string = process.env.PORT || "3001";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

initializeRoutes(app);

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}.`);
});
