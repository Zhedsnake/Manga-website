import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routers from "./router";
import { Server, Socket } from "socket.io";

const app = express()

// app.use(cors({origin: "*",}));
app.use(express.json());
app.use(routers)


if (!process.env.DB_URL) {
    process.exit(1);
}

mongoose.connect(process.env.DB_URL)
    .then(() => {
        const server = app.listen(
            process.env.PORT,
            () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const day = now.getDate();
            const monthNames = [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ];
            const month = monthNames[now.getMonth()];
            const year = now.getFullYear();

            console.log(`SERVER STARTED ON PORT ${process.env.PORT} at ${hours}:${minutes}, day ${day}, month ${month}, year ${year}`);
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
    .catch((e) => console.log(e));