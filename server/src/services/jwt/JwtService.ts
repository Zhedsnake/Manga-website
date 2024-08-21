import jwt from 'jsonwebtoken';

class JwtService {

    getGuestToken(payload: { guest: { id: string } }) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    }

    getUserToken(payload: { user: { id: string } }) {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
        return token;
    }
}

export default new JwtService();
