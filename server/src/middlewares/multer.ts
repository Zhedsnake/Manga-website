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
                // cb(null, '/tmp/buffer');
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

    async checkImageResolution(buffer: Buffer): Promise<{ error: string } | null> {
        try {
            const metadata: Metadata = await sharp(buffer).metadata();

            if (metadata.width !== metadata.height) {
                return { error: 'Изображение должно иметь соотношение сторон 1:1.' };
            }

            return null;
        } catch (err) {
            console.error('Error processing image with sharp:', err);
            return { error: 'Ошибка обработки изображения' };
        }
    }

    async deleteFile(filePath: string) {
        try {
            console.log("Attempting to delete file at:", filePath);
            await fs.promises.unlink(filePath);
            console.log("File deleted successfully.");
        } catch (err) {
            console.error(`Ошибка при удалении файла: ${filePath}`, err);
        }
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
                console.log('Request file:', req.file);

                if (err) {
                    console.log("Error occurred:", err.message);

                    if (req.file) {
                        await this.deleteFile(req.file.path);
                    }

                    return res.status(400).json({error: err.message});
                }

                if (req.file) {
                    console.log("File received:", req.file);
                    console.log("File saved at:", req.file.path);

                    const checkResponse: { error: string } | null = await this.checkImageResolution(req.file.buffer);
                    if (checkResponse && "error" in checkResponse) {
                        await this.deleteFile(req.file.path);

                        return res.status(400).json(checkResponse);
                    }

                    next();
                } else {
                    console.log("No file received.");
                    return res.status(400).json({ error: 'No file received.' });
                }
            });
        };
    }
}

export default FileService;
