import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';

const FILE_SIZE = 3.68; // 3.68MB
const FULL_HD = 1080;


class FileService {

    private disk() {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/tmp/buffer');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now());
            },
        });
    }

    private fileFilterConfig(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Недопустимый тип файла. Разрешены только изображения форматов JPEG, PNG и JPG.'));
        }
    }

    uploadFiles() {

        const upload = multer({
            storage: this.disk(),
            limits: { fileSize: FULL_HD * FULL_HD * FILE_SIZE },
            fileFilter: this.fileFilterConfig,
        });

        return upload.array('files', 5);
    }

    uploadSingleFile() {

        const upload = multer({
            storage: this.disk(),
            limits: { fileSize: FULL_HD * FULL_HD * FILE_SIZE },
            fileFilter: this.fileFilterConfig,
        });

        return (req: Request, res: Response, next: NextFunction) => {
            upload.single('file')(req, res, (err: any) => {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                next();
            });
        };
    }
}

export default new FileService();
