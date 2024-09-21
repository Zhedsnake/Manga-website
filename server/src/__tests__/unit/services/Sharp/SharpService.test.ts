import { UploadedImageByMulter } from '../../../../types/uploadedImageByMulter';
import SharpService from '../../../../services/Sharp/SharpService';
import mockFs from 'mock-fs';
import fs from "fs";
import * as path from 'path';

describe('SharpService', () => {

    beforeEach(() => {
        jest.clearAllMocks();

        mockFs({
            '/tmp': {},
            'src/__tests__/images': {
                '1x1.png': fs.readFileSync(path.resolve(__dirname, '../../../images/1x1.png')),
                'noSymImg.png': fs.readFileSync(path.resolve(__dirname, '../../../images/noSymImg.png'))
            }
        });
    });

    afterEach(() => {
        mockFs.restore();
    });


    describe('CompileImageInThreeFormats', () => {

        test('должен скомпилировать изображения в три формата и сохранить их', async () => {
            const imagePath = path.resolve(__dirname, '../../../images/1x1.png');

            const avatarFile: UploadedImageByMulter = {
                fieldname: 'avatar',
                originalname: 'test.png',
                encoding: '7bit',
                mimetype: 'image/png',
                buffer: fs.readFileSync(imagePath),
                size: fs.statSync(imagePath).size,
                filename: 'test.png',
                path: 'C:/temp/test.png',
                destination: 'C:/temp'
            };

            const result = await SharpService.CompileImageInThreeFormats(imagePath, avatarFile);

            expect(result).toEqual({
                minimizedFilePath: "/tmp/test-480p.png",
                minimizedWebpFilePath: "/tmp/test-480p.webp",
                webpFilePath: "/tmp/test.webp",
            });
        });
    });

    describe('GetWidthAndHeight', () => {

        test('должен вернуть ширину 500 и высоту 500 изображения', async () => {
            const imageSymPath = path.resolve(__dirname, '../../../images/1x1.png');

            expect(fs.existsSync(imageSymPath)).toBe(true);

            jest.unmock('sharp');

            const avatarFile: UploadedImageByMulter = {
                fieldname: 'avatar',
                originalname: '1x1.png',
                encoding: '7bit',
                mimetype: 'image/png',
                buffer: fs.readFileSync(imageSymPath),
                size: fs.statSync(imageSymPath).size,
                filename: '1x1.png',
                path: imageSymPath,
                destination: '/tmp'
            };

            const result = await SharpService.GetWidthAndHeight(avatarFile);

            expect(result).toHaveProperty('width');
            expect(result).toHaveProperty('height');

            expect(result).toEqual({ width: 500, height: 500 }); 
        });


        test('должен вернуть ширину и высоту изображения', async () => {
            const imageNoSymPath = path.resolve(__dirname, '../../../images/noSymImg.png');

            expect(fs.existsSync(imageNoSymPath)).toBe(true);

            jest.unmock('sharp');

            const avatarFile: UploadedImageByMulter = {
                fieldname: 'avatar',
                originalname: 'noSymImg.png',
                encoding: '7bit',
                mimetype: 'image/png',
                buffer: fs.readFileSync(imageNoSymPath),
                size: fs.statSync(imageNoSymPath).size,
                filename: 'noSymImg.png',
                path: imageNoSymPath,
                destination: '/tmp'
            };

            const result = await SharpService.GetWidthAndHeight(avatarFile);

            expect(result).toHaveProperty('width');
            expect(result).toHaveProperty('height');

            expect(result).toEqual({ width: 2650, height: 1600 });
        });
    });
});
