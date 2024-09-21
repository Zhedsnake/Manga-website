import ProtectService from "../../middlewares/ProtectService";
import JwtService from "../../services/jwt/JwtService";
import userBDService from "../../services/mongodb/UserBDService";
import { Request, Response, NextFunction } from "express";
import sharp from "sharp";

jest.mock("../../services/jwt/JwtService");
jest.mock("../../services/mongodb/UserBDService");

describe("ProtectService - checkUserToken", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("должен вернуть 401, если user-token отсутствует", async () => {
        await ProtectService.checkUserToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: 'Нет user-token' });
        expect(next).not.toHaveBeenCalled();
    });

    test("должен вернуть 401, если токен невалидный", async () => {
        req.headers!['user-token'] = "invalidToken";
        (JwtService.decode as jest.Mock).mockReturnValue(null);

        await ProtectService.checkUserToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: "Токен устарел" });
        expect(next).not.toHaveBeenCalled();
    });

    test("должен вернуть 401, если пользователя нет в базе данных", async () => {
        const validDecodedToken = "decodedToken";
        req.headers!['user-token'] = "validToken";
        (JwtService.decode as jest.Mock).mockReturnValue(validDecodedToken);
        (userBDService.findOneUserById as jest.Mock).mockResolvedValue(null);

        await ProtectService.checkUserToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ error: "Токен устарел" });
        expect(next).not.toHaveBeenCalled();
    });

    test("должен вызвать next() при валидном токене и существующем пользователе", async () => {
        const validDecodedToken = "decodedToken";
        req.headers!['user-token'] = "validToken";
        (JwtService.decode as jest.Mock).mockReturnValue(validDecodedToken);
        (userBDService.findOneUserById as jest.Mock).mockResolvedValue({ _id: validDecodedToken });

        await ProtectService.checkUserToken(req as Request, res as Response, next);

        expect(req.headers!['user-id']).toBe(validDecodedToken);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    test("должен вернуть 500 при возникновении ошибки", async () => {
        req.headers!['user-token'] = "validToken";
        (JwtService.decode as jest.Mock).mockImplementation(() => { throw new Error("Test error"); });

        await ProtectService.checkUserToken(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ error: 'Внутренняя ошибка сервера' });
        expect(next).not.toHaveBeenCalled();
    });
});
