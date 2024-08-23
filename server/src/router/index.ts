import { Router } from 'express';
import imagesRouter from "./imagesRouters/imagesRouter";
import guestRouter from "./guestRouter";
import userRouter from "./userRouter";
import authRouter from "./authRouter";

const routers = Router();

routers.use('/api', authRouter);
routers.use('/api', guestRouter);
routers.use('/api', userRouter);
routers.use('/api', imagesRouter);

export default routers;
