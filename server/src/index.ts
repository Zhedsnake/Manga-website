import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routers from "./routers";

const app = express()

app.use(cors({origin: "*",}));
app.use(express.json());
app.use(routers)


if (!process.env.DB_URL) {
    process.exit(1);
}

mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('SERVER STARTED ON PORT ' + process.env.PORT));
    })
    .catch((e) => console.log(e));