import jwt, {JwtPayload} from 'jsonwebtoken';

class JwtService {

    getGuestToken(payload: { guest: { id: string } }): string {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    }

    getUserToken(payload: { user: { id: string } }): string {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
        return token;
    }

    decode(token: string): string | null {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        try {
            const decoded = jwt.verify(token, secret) as JwtPayload & { guest?: { id: string }, user?: { id: string } };

            if (decoded.guest) {
                return decoded.guest.id;
            } else if (decoded.user) {
                return decoded.user.id;
            } else {
                return null;
            }
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return null;
            } else {
                return null;
            }
        }
    }
}

export default new JwtService();
