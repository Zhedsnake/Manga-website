import { UploadApiResponse } from 'cloudinary';
import CloudinaryService from "../cloudinary/CloudinaryService";
import ImagesBDService from "../mongodb/ImagesBDService";
import {ImagesType} from "../../models/imagesModel";

interface ImageDocument {
    _id: string;
    original_filename: string;
    secure_url: string;
    __v: number;
}

interface UploadImageBody {
    title?: string;
    description?: string;
}

interface UploadImage {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

class ImagesService {

    async uploadImages(
        body: UploadImageBody,
        images: { files: UploadImage[] }
    ) {
        try {
            const uploadPromises: Promise<UploadApiResponse>[] = images.files.map(file =>
                CloudinaryService.uploadImage(file.path, file.originalname, 'Mangas/example')
            );

            const responseCloudinary: Awaited<UploadApiResponse>[] = await Promise.all(uploadPromises);


            const savePromises = responseCloudinary.map(saveImageData =>
                ImagesBDService.uploadImages(
                    saveImageData.original_filename,
                    saveImageData.secure_url
                )
            );

            const responseDB = await Promise.all(savePromises);

            if(responseDB){
                return ({message: 'Файлы загружены'})
            } else {
                return ({message:'Произошла ошибка при загрузке файлов'})
            }
        } catch (e) {
            console.error(e);
        }
    }

    async getTotalCountImages () {
        try {
            const count = await ImagesBDService.getTotalCountImages()

            if (typeof count === 'number') {
                return { countImages: count };
            } else {
                console.error('Ошибка: полученный ответ не является числом.');
            }

        } catch (e) {
            console.error(e)
        }
    }

    async getImageUrlByNumber(number: any) {
        try {
            const queryNumber = number;

            const parseIntNumber = Array.isArray(queryNumber)
                ? parseInt(queryNumber[0], 10)
                : parseInt(String(queryNumber), 10);


            if (isNaN(parseIntNumber)) {
                return { message: 'query параметром должно быть числом' };
            }

            const imageUrlByNumber = await ImagesBDService.getImageUrlByNumber(parseIntNumber);

            if (imageUrlByNumber) {
                const imageUrl: string = imageUrlByNumber.secure_url

                return { secure_url: imageUrl}
            } else {
                return { message: 'БД не вернула документ по номеру' };
            }

        } catch (e) {
            console.error(e)
        }
    }

    async getAllImages() {
        try {
            const images: ImagesType[] = await ImagesBDService.getAllImages();

            if (!images || images.length === 0) {
                return { message: 'БД не вернула документы' };
            }

            const imagesArray = images.map(image => {
                return { secure_url: image.secure_url };
            });

            return imagesArray;
        } catch (e) {
            console.error(e);
            return { message: 'Произошла ошибка при получении изображений' };
        }
    }
}

export default new ImagesService();