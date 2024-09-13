import { Model } from "mongoose";
import { AuthBDService } from "../../../../src/services/mongodb/AuthBDService";
import userModel, { userType } from "../../../../src/models/userModel";
import { guestModel, guestType } from "../../../../src/models/guestModel";
import {connectDB} from "../../../../src/config/db";

jest.mock("../../../../src/models/userModel");
jest.mock("../../../../src/models/guestModel");

const mockUserModel = userModel as jest.Mocked<Model<userType>>;
const mockGuestModel = guestModel as jest.Mocked<Model<guestType>>;

describe("AuthBDService", () => {
    let authService: AuthBDService

    beforeAll(async () => {
        authService = new AuthBDService();

        if (!process.env.DB_TEST_URL) {
            return
        }

        const mongo_url = process.env.DB_TEST_URL;

        await connectDB(mongo_url);
    })

    beforeEach(async () => {
        jest.clearAllMocks();

        await userModel.deleteMany({});
        await guestModel.deleteMany({});
    });

    afterAll(async () => {
        // await disconnectDB();
    });

    test("createGuest должен возвращать идентификатор", async () => {
        const guest = new guestModel({});
        await guest.save();

        const result = await authService.createGuest();

        expect(result).toEqual({ id: guest.id });
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
