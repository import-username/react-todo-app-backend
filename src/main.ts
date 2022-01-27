import express from "express";

const PORT: string = process.env.PORT || "3001";

const app = express();



app.listen(() => {
    console.log(`Server started, listening on port ${PORT}.`);
});
