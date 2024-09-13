import { Model, Document } from "mongoose";
import {AuthBDService} from "../../../../src/services/mongodb/AuthBDService";
import userModel, { userType } from "../../../../src/models/userModel";
import { guestModel, guestType } from "../../../../src/models/guestModel";

jest.mock("../../../../src/models/userModel");
jest.mock("../../../../src/models/guestModel");

const mockUserModel = userModel as jest.Mocked<Model<userType>>;
const mockGuestModel = guestModel as jest.Mocked<Model<guestType>>;

describe("AuthBDService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("createGuest должен возвращать идентификатор", async () => {
        const mockSave = jest.fn().mockResolvedValue({});
        const mockId = "mockGuestId";
        const mockNewGuest = { save: mockSave, id: mockId } as unknown as guestType;

        mockGuestModel.prototype.save = mockSave;

        jest.spyOn(mockGuestModel.prototype, 'save').mockResolvedValue(mockNewGuest);

        const authService = new AuthBDService();
        const result = await authService.createGuest();

        expect(result).toEqual({ id: mockId });
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
