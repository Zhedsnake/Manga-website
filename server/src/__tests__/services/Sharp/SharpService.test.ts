import sharp from 'sharp';
import { UploadedImageByMulter } from '../../../types/uploadedImageByMulter';
import SharpService from '../../../services/Sharp/SharpService';
import mockFs from 'mock-fs';
import fs from "fs";
import * as path from "node:path";

jest.mock('sharp');

describe('SharpService', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        mockFs({
            '/tmp': {},
            'src/__tests__/images': {
                '1x1.png': Buffer.from([0, 0, 0, 0])
            }
        });
    });

    afterEach(() => {
        mockFs.restore();
    });

    describe('CompileImageInThreeFormats', () => {
        const mockSharpInstance = {
            webp: jest.fn().mockReturnThis(),
            resize: jest.fn().mockReturnThis(),
            toBuffer: jest.fn().mockResolvedValue(Buffer.from('mockedBuffer')),
            toFile: jest.fn().mockResolvedValue({})
        };

        test('должен скомпилировать изображения в три формата и сохранить их', async () => {

            (sharp as unknown as jest.Mock).mockReturnValue(mockSharpInstance);

            const imageBuffer = 'fakeImageBuffer';
            const avatarFile: UploadedImageByMulter = {
                fieldname: 'avatar',
                originalname: 'test.png',
                encoding: '7bit',
                mimetype: 'image/png',
                buffer: Buffer.from(imageBuffer),
                size: 1024,
                filename: 'test.png',
                path: '/tmp/test.png',
                destination: '/tmp'
            };

            const result = await SharpService.CompileImageInThreeFormats(imageBuffer, avatarFile);

            expect(result).toEqual({
                webpFilePath: '/tmp/test.webp',
                minimizedFilePath: '/tmp/test-480p.png',
                minimizedWebpFilePath: '/tmp/test-480p.webp',
            });

            expect(sharp).toHaveBeenCalledTimes(5);
            expect(mockSharpInstance.webp).toHaveBeenCalledTimes(2);
            expect(mockSharpInstance.resize).toHaveBeenCalledTimes(1);
            expect(mockSharpInstance.toBuffer).toHaveBeenCalledTimes(2);
            expect(mockSharpInstance.toFile).toHaveBeenCalledTimes(3);
        });
    });

    describe('GetWidthAndHeight', () => {
        test('должен вернуть ширину и высоту изображения', async () => {
            const imagePath = path.resolve(__dirname, '../../images/1x1.png');

            expect(fs.existsSync(imagePath)).toBe(true);

            const mockSharpInstance = {
                metadata: jest.fn().mockResolvedValue({ width: 200, height: 200 }),
            };

            (sharp as unknown as jest.Mock).mockReturnValue(mockSharpInstance);

            const avatarFile: UploadedImageByMulter = {
                fieldname: 'avatar',
                originalname: '1x1.png',
                encoding: '7bit',
                mimetype: 'image/png',
                buffer: fs.readFileSync(imagePath),
                size: fs.statSync(imagePath).size,
                filename: '1x1.png',
                path: imagePath,
                destination: '/tmp'
            };

            const result = await SharpService.GetWidthAndHeight(avatarFile);

            expect(result).toHaveProperty('width');
            expect(result).toHaveProperty('height');
            expect(result.width).toBe(200);
            expect(result.height).toBe(200);
        });
    });
});
