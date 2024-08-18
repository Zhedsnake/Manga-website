import { Router } from 'express';
import imagesRouter from "./imagesRouters/imagesRouter";
import guestRouter from "./authRouters/guestRouter";
import userRouter from "./authRouters/userRouter";

const routers = Router();

routers.use('/api', imagesRouter);
routers.use('/api', guestRouter);
routers.use('/api', userRouter);

export default routers;
