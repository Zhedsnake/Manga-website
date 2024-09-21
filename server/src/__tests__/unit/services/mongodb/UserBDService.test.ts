import userModel from "../../../models/userModel";
import 'dotenv/config';
import UserBDService from '../../../services/mongodb/UserBDService';
import { connectDB, disconnectDB } from "../../../config/db";
import AuthBDService from "../../../services/mongodb/AuthBDService";
import MockDate from 'mockdate';


describe('UserBDService', () => {

    beforeAll(async () => {
        // const mongoUrl = process.env.DB_TEST_URL;
        // if (!mongoUrl) {
        //     throw new Error("DB_TEST_URL environment variable is not set");
        // }
        // await connectDB(mongoUrl);
    });

    afterAll(async () => {
        // await disconnectDB();
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    test('должен возвращать информацию о пользователе name + minPic', async () => {
        const name = "Zhed";
        const email = "zhed@gmail.com";
        const password = "SRdfrr5465y%";
        const pic = "path/to/pic.jpg";
        const minPicWebp = 'path/to/minPicWebp.webp';
        const minPic = "path/to/minPic.jpg";

        const userRegistrationData = {
            name,
            email,
            password,
            pic,
            minPic,
            minPicWebp
        };

        const registeredUser = await AuthBDService.register(userRegistrationData);

        const userInfo = await UserBDService.GetSmallUserInfoByTokenNoWebp(registeredUser!.id);

        expect(userInfo).toEqual({
            name: userRegistrationData.name,
            minPic: userRegistrationData.minPic
        });
    });

    test('должен возвращать информацию о пользователе name + pic', async () => {
        const name = "Zhed";
        const email = "zhed@gmail.com";
        const password = "SRdfrr5465y%";
        const minPicWebp = 'path/to/minPicWebp.webp';
        const pic = "path/to/pic.jpg";

        const userRegistrationData = {
            name,
            email,
            password,
            pic,
            minPicWebp
        };

        const registeredUser = await AuthBDService.register(userRegistrationData);

        const userInfo = await UserBDService.GetSmallUserInfoByTokenNoWebp(registeredUser!.id);

        expect(userInfo).toEqual({
            name: userRegistrationData.name,
            pic: userRegistrationData.pic
        });
    });

    test('должен возвращать информацию о пользователе с изображением webp', async () => {
        const name = "Zhed";
        const email = "zhed@gmail.com";
        const password = "SRdfrr5465y%";
        const minPicWebp = 'path/to/minPicWebp.webp';
        const pic = "path/to/pic.jpg";

        const userRegistrationData = {
            name,
            email,
            password,
            pic,
            minPicWebp
        };

        const registeredUser = await AuthBDService.register(userRegistrationData);

        const userInfo = await UserBDService.GetSmallUserInfoByTokenWebp(registeredUser!.id);

        expect(userInfo).toEqual({
            name: userRegistrationData.name,
            minPicWebp: userRegistrationData.minPicWebp
        });
    });

    test('должен возвращать полную информацию о пользователе без webp', async () => {
        const mockDateValue = new Date('2024-09-17T07:09:57.367Z');
        MockDate.set(mockDateValue);

        const name = "Zhed";
        const email = "zhed@gmail.com";
        const password = "SRdfrr5465y%";
        const minPicWebp = 'path/to/minPicWebp.webp';
        const minWebp = 'path/to/PicWebp.webp';
        const pic = "path/to/pic.jpg";

        const userRegistrationData = {
            name,
            email,
            password,
            pic,
            minWebp,
            minPicWebp
        };

        const registeredUser = await AuthBDService.register(userRegistrationData);

        const userInfo = await UserBDService.GetUserInfoByTokenNoWebp(registeredUser!.id);

        expect(userInfo).toEqual({
            name: userRegistrationData.name,
            email: userRegistrationData.email,
            pic: userRegistrationData.pic,
            registeredAt: mockDateValue.toISOString(),
        });

        MockDate.reset();
    });

    test('должен возвращать полную информацию о пользователе с webp', async () => {
        const mockDateValue = new Date('2024-09-17T07:09:57.367Z');
        MockDate.set(mockDateValue);

        const name = "Zhed";
        const email = "zhed@gmail.com";
        const password = "SRdfrr5465y%";
        const minPicWebp = 'path/to/minPicWebp.webp';
        const pic = "path/to/pic.jpg";
        const picWebp = "path/to/pic.webp";

        const userRegistrationData = {
            name,
            email,
            password,
            pic,
            picWebp,
            minPicWebp
        };

        const registeredUser = await AuthBDService.register(userRegistrationData);

        const userInfo = await UserBDService.GetUserInfoByTokenWebp(registeredUser!.id);

        expect(userInfo).toEqual({
            picWebp: userRegistrationData.picWebp,  
            name: userRegistrationData.name,
            email: userRegistrationData.email,
            registeredAt: mockDateValue.toISOString(),
        });

        MockDate.reset();
    });

    test('следует найти пользователя по идентификатору', async () => {
        const name = "Zhed";
        const email = "zhed@gmail.com";
        const password = "SRdfrr5465y%";
        const minPicWebp = 'path/to/minPicWebp.webp';
        const pic = "path/to/pic.jpg";
        const picWebp = "path/to/pic.webp";

        const userRegistrationData = {
            name,
            email,
            password,
            pic,
            picWebp,
            minPicWebp
        };

        const registeredUser = await AuthBDService.register(userRegistrationData);

        const foundUser = await UserBDService.findOneUserById(registeredUser!.id);

        expect(foundUser).not.toBeNull();

        if (foundUser && "name" in foundUser) {
            expect(foundUser.name).toBe('Zhed');
        }

    });

    test('должен возвращать значение null, если пользователь не существует', async () => {
        const name = "Zhed";
        const email = "zhed@gmail.com";
        const password = "SRdfrr5465y%";

        const userRegistrationData = {
            name,
            email,
            password,
        };

        const registeredUser = await AuthBDService.register(userRegistrationData);

        await userModel.deleteMany({});

        const user = await UserBDService.findOneUserById(registeredUser!.id);

        expect(user).toBeNull();
    });
});
