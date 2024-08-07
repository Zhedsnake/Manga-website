import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import router from "./router.ts";
// import fileUpload from "express-fileupload";

import cloudinaryService from "./cloudinary/cloudinaryService";

const app = express()

app.use(cors({origin: "*",}));
app.use(express.json());
// app.use(fileUpload({}))
// app.use('/api', router)



(async function () {
    const resp = await cloudinaryService
        .uploadImage('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', 'shoes')
        .catch((error) => {
            console.log(error);
        })

    console.log(resp);
})();



if (!process.env.DB_URL) {
    process.exit(1);
}
mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => console.log('SERVER STARTED ON PORT ' + process.env.PORT));
    })
    .catch((e) => console.log(e));