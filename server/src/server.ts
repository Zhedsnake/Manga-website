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


if (!process.env.DB_URL) {
    process.exit(1);
}

connectDB(process.env.DB_URL)
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