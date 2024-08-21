import JwtService from "../../jwt/JwtService";
import registerRequestTypes from "../../../types/registerRequestTypes";
import UserBDService from "../../mongodb/UserBDService";


class UserService {

    async register(register: registerRequestTypes) {
        try {
            const responseBD: { id: string } | { error: string } = await UserBDService.register(register);

            if (responseBD) {
                if ("error" in responseBD) {
                    return responseBD
                } else if ("id" in responseBD) {
                    const payload = {
                        user: {
                            id: responseBD.id,
                        },
                    };

                    const userToken = JwtService.getUserToken(payload);
                    return { userToken: userToken};
                }
            }

            // const jwtToken = JwtService.getGuestToken(payload);

            // return jwtToken

        } catch (e) {
            console.error(e);
        }
    }
}

export default new UserService();
