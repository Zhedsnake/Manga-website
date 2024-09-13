import { AuthBDService } from "../../../../src/services/mongodb/AuthBDService";
import { connectDB } from "../../../../src/config/db";

import userModel, { userType } from "../../../../src/models/userModel";
import { guestModel, guestType } from "../../../../src/models/guestModel";
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

    afterEach(async () => {
        jest.clearAllMocks();

        await userModel.deleteMany({});
        await guestModel.deleteMany({});
    });

    afterAll(async () => {
        // await disconnectDB();
    });

    test("createGuest должен возвращать идентификатор", async () => {
        const result = await authService.createGuest();

        if (result) {
            expect(result.id).toBeDefined();
        }
    });

    // test("register should return an id", async () => {
    //     const mockSave = jest.fn().mockResolvedValue({});
    //     const mockId = "mockUserId";
    //     const mockNewUser = { save: mockSave, id: mockId, password: "mockPassword" } as unknown as userType;
    //
    //     mockUserModel.prototype.save = mockSave;
    //     jest.spyOn(mockUserModel.prototype, 'save').mockResolvedValue(mockNewUser);
    //
    //     const authService = new AuthBDService();
    //     const result = await authService.register({ name: "John", password: "1234", email: "john@example.com" });
    //
    //     expect(result).toEqual({ id: mockId });
    // });
    //
    // test("login should return user id and password", async () => {
    //     const mockId = "mockUserId";
    //     const mockPassword = "mockPassword";
    //     const mockUser = { id: mockId, password: mockPassword } as unknown as userType;
    //
    //     jest.spyOn(mockUserModel, 'findOne').mockResolvedValue(mockUser);
    //
    //     const authService = new AuthBDService();
    //     const result = await authService.login({ name: "John" });
    //
    //     expect(result).toEqual({ id: mockId, password: mockPassword });
    // });
});
