import sharp from "sharp";
import {UploadedImageByMulter} from "../../types/uploadedImageByMulter";

class SharpService {

    async CompileImageInThreeFormats(imageBuffer: string, avatarFile: UploadedImageByMulter): Promise<{minimizedFilePath: string, webpFilePath: string, minimizedWebpFilePath: string}> {

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

        return {webpFilePath: webpFilePath, minimizedFilePath: resizedFilePath, minimizedWebpFilePath: webpResizedFilePath};
    }

    async GetWidthAndHeight(file: UploadedImageByMulter){
        const metadata = await sharp(file.path).metadata()

        return {width: metadata.width, height: metadata.height}
    }
}

export default new SharpService();
