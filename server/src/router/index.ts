import { Router } from 'express';
import guestRouter from "./guestRouter";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import editUserRouter from "./editUserRouter";

const routers = Router();

routers.use('/api', authRouter);
routers.use('/api', userRouter);
routers.use('/api', editUserRouter);
routers.use('/api', guestRouter);

export default routers;
