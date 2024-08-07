import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import router from "./router.ts";
// import fileUpload from "express-fileupload";

import cloudinaryService from "./cloudinary/cloudinaryService";
import {UploadApiResponse} from "cloudinary";

const app = express()

app.use(cors({origin: "*",}));
app.use(express.json());
// app.use(fileUpload({}))
// app.use('/api', router)



(async function () {
    const respManga: void | UploadApiResponse = await cloudinaryService.uploadMangaImage('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', 'shoes', 'someuser1/example')
        .catch((error) => {
            console.log(error);
        })

    const respMangas: void | UploadApiResponse[] = await cloudinaryService.uploadMultipleMangaImages(
        [
            {path: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', public_id: 'shoes1'},
            {path: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', public_id: 'shoes2'},
            {path: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', public_id: 'shoes3'},
            {path: 'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', public_id: 'shoes4'},
        ],
        'someuser2/example')
        .catch((error) => {
            console.log(error);
        })

    // const respAvatar: void | UploadApiResponse = await cloudinaryService.uploadAvatarImage('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', 'shoes', 'someuser2/example')
    //     .catch((error) => {
    //         console.log(error);
    //     })

    // const opturl = await cloudinaryService.optimizeUrlImage('shoes')
    //     .catch((error) => {
    //         console.log(error);
    //     })
    if(respManga) {
        console.log(respManga.secure_url);
    }
    console.log(respMangas);
    // console.log(respAvatar);
    // console.log(opturl);
})();



if (!process.env.DB_URL) {
    process.exit(1);
}
mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('SERVER STARTED ON PORT ' + process.env.PORT));
    })
    .catch((e) => console.log(e));