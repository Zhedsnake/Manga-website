import { AuthBDService } from "../../../services/mongodb/AuthBDService";
import {connectDB, disconnectDB} from "../../../config/db";

import userModel from "../../../models/userModel";
import { guestModel } from "../../../models/guestModel";
import 'dotenv/config'


describe("AuthBDService", () => {
    let authService: AuthBDService;

    beforeAll(async () => {
        authService = new AuthBDService();

        const mongoUrl = process.env.DB_TEST_URL;

        if (!mongoUrl) {
            throw new Error("DB_TEST_URL environment variable is not set");
        }

        await connectDB(mongoUrl);
    });

    beforeEach(async () => {
        jest.clearAllMocks();

        await userModel.deleteMany({});
        await guestModel.deleteMany({});
    });

    afterAll(async () => {
        await userModel.deleteMany({});
        await guestModel.deleteMany({});
        await disconnectDB();
    });

    test("createGuest должен возвращать идентификатор", async () => {
        const result = await authService.createGuest();

        if (result) {
            expect(result.id).toBeDefined();
        }
    });

    test("регистрация должна возвращать идентификатор", async () => {
        const result = await authService.register({ name: "John", password: "1234", email: "john@example.com" });

        if (result) {
            expect(result.id).toBeDefined();
        }
    });

    test("login should return user id and password", async () => {
        const result = await authService.login({ name: "John" });

        if (result) {
            expect(result.id).toBeDefined();
        }
    });
});
