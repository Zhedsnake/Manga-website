import CloudinaryService from '../../../services/cloudinary/CloudinaryService';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import 'dotenv/config';

describe('CloudinaryService', () => {
    const testFolder = 'test-folder';
    let imagePath: string;

    beforeAll(() => {
        imagePath = path.resolve(__dirname, '../../images/1x1.png');

        if (!fs.existsSync(imagePath)) {
            throw new Error('Тестовое изображение отсутствует');
        }
    });

    afterAll(async () => {
        await CloudinaryService.ClearImages(testFolder);
    });

    test('следует загружать изображение в Cloudinary', async () => {
        const originalname = 'test-image.png';

        const result = await CloudinaryService.uploadImage(imagePath, originalname, testFolder);

        expect(result).toHaveProperty('public_id');
        expect(result).toHaveProperty('secure_url');
        expect(result.secure_url).toContain('https://');
    });

    test('следует удалять изображения в Cloudinary', async () => {
        await CloudinaryService.ClearImages(testFolder);

        const result = await cloudinary.api.resources({ type: 'upload', prefix: `${testFolder}/` });

        expect(result.resources.length).toBe(0);
    });
});
