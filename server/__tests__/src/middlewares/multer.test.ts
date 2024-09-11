import multer, {FileFilterCallback} from 'multer';
import {Request, Response, NextFunction} from 'express';
import FileService from '../../../src/middlewares/multer';

const mockMulter = {
    array: jest.fn((fieldName: string, maxCount: number) => (req: Request, res: Response, next: NextFunction) => next()),
    single: jest.fn(
        () => (req: Request, res: Response, next: NextFunction) => {
            const fileLimit = 3.68 * 1080 * 1080; // Лимит размера файла 3.68MB, 1080
            if (req.file && req.file.size > fileLimit) {
                return res.status(400).json({ message: 'Превышен допустимый размер файла.' });
            }
            if (req.file && req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpg') {
                return next(new Error('Недопустимый тип файла. Разрешены только изображения форматов JPEG, PNG и JPG.'));
            }
            next();
        }
    ),
};

jest.mock('multer', () => {
    const multer = jest.fn(() => mockMulter);
    const objectMulter = jest.requireActual('multer');
    for (const prop in objectMulter) {
        if (Object.prototype.hasOwnProperty.call(objectMulter, prop)) {
            (multer as any)[prop] = objectMulter[prop];
        }
    }
    return multer;
});

describe('FileService', () => {
    let fileService: FileService;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        fileService = new FileService();
        mockRequest = {};
        mockResponse = {};
        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('uploadFiles', () => {

        test('следует настроить multer для многократной загрузки файлов', () => {

            const uploadMiddleware = fileService.uploadFiles();
            uploadMiddleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(multer).toHaveBeenCalledWith(expect.objectContaining({
                storage: expect.anything(),
                limits: {fileSize: expect.any(Number)},
                fileFilter: expect.any(Function)
            }));

            expect(mockMulter.array).toHaveBeenCalledWith('files', 5);

            expect(mockMulter.array).toMatchSnapshot();
        });
    });

    describe('uploadSingleFile', () => {

        test('следует настроить multer для промежуточного программного обеспечения для загрузки одного файла', () => {
            const uploadMiddleware = fileService.uploadSingleFile();
            uploadMiddleware(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(multer).toHaveBeenCalledWith(expect.objectContaining({
                storage: expect.anything(),
                limits: {fileSize: expect.any(Number)},
                fileFilter: expect.any(Function)
            }));

            expect(mockMulter.single).toHaveBeenCalledWith('file');

            expect(mockMulter.single).toMatchSnapshot();
        });

        test('следует вызвать функцию next(), если загрузка файла прошла успешно', () => {

            const uploadMiddleware = fileService.uploadSingleFile();
            const mockRequestWithFile: Partial<Request> = {file: {mimetype: 'image/jpeg'} as Express.Multer.File};

            uploadMiddleware(mockRequestWithFile as Request, mockResponse as Response, mockNext as NextFunction);
        });

        test('должен возвращать код состояния 400, если указан недопустимый тип файла', () => {
            const uploadMiddleware = fileService.uploadSingleFile();
            const mockRequestWithInvalidFile: Partial<Request> = {file: {mimetype: 'text/plain'} as Express.Multer.File};
            const mockResponseWithStatus = {
                status: jest.fn(() => mockResponseWithStatus),
                json: jest.fn()
            } as unknown as Response;

            uploadMiddleware(mockRequestWithInvalidFile as Request, mockResponseWithStatus, mockNext as NextFunction);

            expect(mockResponseWithStatus.status).toHaveBeenCalledWith(400);
            expect(mockResponseWithStatus.json).toHaveBeenCalledWith({message: 'Недопустимый тип файла. Разрешены только изображения форматов JPEG, PNG и JPG.'});

            expect(mockResponseWithStatus).toMatchSnapshot();
        });

        test('должен возвращать код состояния 400, если файл превышает допустимый размер', () => {
            const uploadMiddleware = fileService.uploadSingleFile();

            const mockRequestWithLargeFile: Partial<Request> = { file: { mimetype: 'image/jpeg', size: 999999999 } as Express.Multer.File };

            const mockResponseWithStatus = {
                status: jest.fn(() => mockResponseWithStatus),
                json: jest.fn(),
            } as unknown as Response;

            uploadMiddleware(mockRequestWithLargeFile as Request, mockResponseWithStatus, mockNext as NextFunction);

            expect(mockResponseWithStatus.status).toHaveBeenCalledWith(400);

            expect(mockResponseWithStatus.json).toHaveBeenCalledWith({
                message: 'Превышен допустимый размер файла.',
            });

            expect(mockResponseWithStatus).toMatchSnapshot();
        });
    });
});
