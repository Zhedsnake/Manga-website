import sharp from "sharp";

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

class SharpService {

    async CompileImageInThreeFormats(imageBuffer: string, avatarFile: UploadImage): Promise<{webp: string, minimized: string, minimizedWebp: string}> {

        // webp
        const webpImageBuffer = await sharp(imageBuffer)
            .webp()
            .toBuffer();
        const webpFilePath = `/tmp/${avatarFile.filename.split('.')[0]}.webp`;
        await sharp(webpImageBuffer).toFile(webpFilePath);

        // 480p (minimized)
        const resizedImageBuffer = await sharp(imageBuffer)
            .resize(480, 480, { fit: 'cover' })
            .toBuffer();
        const resizedFilePath = `/tmp/${avatarFile.filename.split('.')[0]}-480p.${avatarFile.mimetype.split('/')[1]}`;
        await sharp(resizedImageBuffer).toFile(resizedFilePath);

        // webp 480p (minimizedWebp)
        const webpResizedFilePath = `/tmp/${avatarFile.filename.split('.')[0]}-480p.webp`;
        await sharp(resizedImageBuffer)
            .webp()
            .toFile(webpResizedFilePath);

        return {webp: webpFilePath, minimized: resizedFilePath, minimizedWebp: webpResizedFilePath};
    }
}

export default new SharpService();
