import mongoose from 'mongoose';
import UserModel, { userType } from '../../../models/userModel';
import 'dotenv/config'

describe('UserModel', () => {

    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
    });

    test('должен создать пользователя с обязательными полями', async () => {
        const userData: Partial<userType> = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            pic: 'https://example.com/pic.jpg',
        };

        const user = new UserModel(userData);
        const savedUser = await user.save();

        expect(savedUser).toHaveProperty('_id');

        expect(savedUser).toHaveProperty('createdAt');

        expect(savedUser).toHaveProperty('updatedAt');

        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.pic).toBe(userData.pic);
    });

    test('должен создать пользователя с полем по умолчанию', async () => {
        const userData: Partial<userType> = {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: 'password123',
            pic: 'https://example.com/pic.jpg',
        };

        const user = new UserModel(userData);
        const savedUser = await user.save();

        expect(savedUser.pic).toBe(userData.pic);

        expect(savedUser.minPic).toBeUndefined();
        expect(savedUser.picWebp).toBeUndefined();
        expect(savedUser.minPicWebp).toBeUndefined();
        expect(savedUser.isAdmin).toBeUndefined();
    });

    test('должен создать и получить пользователя по id', async () => {

        const userData: Partial<userType> = {
            name: 'Alice Smith',
            email: 'alice.smith@example.com',
            password: 'password123',
            pic: 'https://example.com/alice.jpg',
        };

        const user = new UserModel(userData);
        await user.save();

        const retrievedUser = await UserModel.findById(user.id);

        expect(retrievedUser).not.toBeNull();

        if (retrievedUser && "email" in retrievedUser && "name" in retrievedUser) {
            expect(retrievedUser.email).toBe(userData.email);
            expect(retrievedUser.name).toBe(userData.name);
        }
    });
});
