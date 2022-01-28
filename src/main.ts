import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT: string = process.env.PORT || "3001";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))

app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}.`);
});
