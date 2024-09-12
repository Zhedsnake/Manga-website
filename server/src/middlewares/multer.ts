import multer, {FileFilterCallback} from 'multer';
import {Request, Response, NextFunction} from 'express';
import sharp, {Metadata} from 'sharp';
import fs from 'fs';

const FILE_SIZE = 3.68; // 3.68MB

class FileService {

    disk() {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/tmp');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname + '-' + Date.now());
            },
        });
    }

    fileFilterConfig(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Недопустимый тип файла. Разрешены только изображения форматов JPEG, PNG и JPG.'));
        }
    }

    async deleteFile(filePath: string) {
        await fs.promises.unlink(filePath);
    }

    // uploadFiles() {
    //     const upload = multer({
    //         storage: this.disk(),
    //         limits: {fileSize: 1024 * 1024 * FILE_SIZE},
    //         fileFilter: this.fileFilterConfig,
    //     });
    //
    //     return (req: Request, res: Response, next: NextFunction) => {
    //         upload.array('files', 5)(req, res, next);
    //     };
    // }

    uploadUserAvatar() {
        const upload = multer({
            storage: this.disk(),
            limits: {fileSize: 1024 * 1024 * FILE_SIZE},
            fileFilter: this.fileFilterConfig,
        });

        return (req: Request, res: Response, next: NextFunction) => {
            upload.single('avatar')(req, res, async (err: any) => {

                if (err) {

                    if (req.file) {
                        await this.deleteFile(req.file.path);
                    }

                    return res.status(400).json({error: err.message});
                }

                if (req.file) {

                    next();

                }
            });
        };
    }
}

export default FileService;
