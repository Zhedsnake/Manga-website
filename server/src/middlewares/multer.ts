import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

const storage: StorageEngine = multer.diskStorage({
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void => {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage: storage });
