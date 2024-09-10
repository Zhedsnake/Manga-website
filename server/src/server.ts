import 'dotenv/config'
import express from "express";
import cors from "cors";
import routers from "./router";
import { Server, Socket } from "socket.io";
import {connectDB} from "./config/db";
import {timeDateNow} from "./modules/timeDateNow";

const app = express()

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(routers)

if (!process.env.DB_PRODUCTION_URL) {
    process.exit(1);
}
if (!process.env.DB_DEV_URL) {
    process.exit(1);
}
if (!process.env.DB_TEST_URL) {
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    process.exit(1);
}

const setOption = (): string | undefined => {
    if (process.env.IS_PROD && process.env.DB_PRODUCTION_URL && process.env.IS_PROD === 'true') {
        console.log(`Режим production`)
        return process.env.DB_PRODUCTION_URL
    }
    if (process.env.IS_DEV && process.env.DB_DEV_URL && process.env.IS_DEV === 'true') {
        console.log(`Режим development`)
        return process.env.DB_DEV_URL
    }
    if (process.env.IS_TEST && process.env.DB_TEST_URL && process.env.IS_TEST === 'true') {
        console.log(`Режим test`)
        return process.env.DB_TEST_URL
    }
}

const option: string | undefined = setOption()

connectDB(option!)
    .then(() => {
        const server = app.listen(
            process.env.PORT,
            () => {
                const dateStart: string = timeDateNow();
                console.log(`Сервер запущен. Порт: ${process.env.PORT}. Когда:` + dateStart);
            }
        );

        return server
    })
    .then((server) => {
        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: "*",
            },
        });

        io.on("connection", (socket: Socket) => {
            console.log("Connected to socket.io");

            // socket.on("setup", (userData: any) => {
            //     socket.join(userData._id);
            //     socket.emit("connected");
            // });
            //
            // socket.off("setup", (userData: any) => {
            //     console.log("USER DISCONNECTED");
            //     socket.leave(userData._id);
            // });
        });
    })
    .catch((e: Error) => console.log(e));