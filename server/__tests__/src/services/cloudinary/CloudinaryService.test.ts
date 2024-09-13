import CloudinaryService from '../../../../src/services/cloudinary/CloudinaryService';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary', () => ({
    v2: {
        config: jest.fn(),
        uploader: {
            upload: jest.fn(),
        },
        api: {
            delete_resources_by_prefix: jest.fn(),
        },
    },
}));

describe('CloudinaryService', () => {
    const mockUploadResponse = {
        public_id: 'mock-public-id',
        secure_url: 'https://mock-url.com/image.png',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('следует правильно загружать изображение', async () => {
        (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(mockUploadResponse);

        const imagePath = 'path/to/image.png';
        const originalname = 'image.png';
        const folder = 'test-folder';

        const result = await CloudinaryService.uploadImage(imagePath, originalname, folder);

        expect(cloudinary.uploader.upload).toHaveBeenCalledWith(imagePath, {
            public_id: expect.any(String),
            folder: folder,
            format: 'png',
        });

        expect(result).toEqual(mockUploadResponse);
    });

    test('следует правильно очищать изображения', async () => {
        (cloudinary.api.delete_resources_by_prefix as jest.Mock).mockResolvedValue({});

        const folder = 'test-folder';

        await CloudinaryService.ClearImages(folder);

        expect(cloudinary.api.delete_resources_by_prefix).toHaveBeenCalledWith(`${folder}/`);
    });
});
