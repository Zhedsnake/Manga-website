import multer, { StorageEngine } from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage: StorageEngine = multer.diskStorage({
  filename: (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, filename: string) => void
  ): void => {
    cb(null, file.originalname);
  }
});

const multerUpload = multer({ storage: storage });

export const upload = (req: Request, res: Response, next: NextFunction) => {
  multerUpload.any()(req, res, (err) => {
    if (err) {
      return res.status(400).send({message: 'Вы не выбрали файлы'});
    }

    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      console.log(`ошибка здесь`);
      return res.status(400).send({message: 'Файлы не загружены'});
    }

    next();
  });
};
