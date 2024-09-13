import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import 'dotenv/config';

class JwtService {
    private secret: string;

    constructor() {
        const jwt_secret: string | undefined = process.env.JWT_SECRET;
        if (!jwt_secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        this.secret = jwt_secret;
    }

    getGuestToken(id: string): string {
        const payload = {
            guest: { id },
        };
        return jwt.sign(payload, this.secret);
    }

    getUserToken(id: string): string {
        const payload = {
            user: { id },
        };
        return jwt.sign(payload, this.secret, { expiresIn: '30d' });
    }

    decode(token: string): string | null {
        try {
            const decoded = jwt.verify(token, this.secret) as JwtPayload & { guest?: { id: string }, user?: { id: string } };
            if (decoded.guest) {
                return decoded.guest.id;
            } else if (decoded.user) {
                return decoded.user.id;
            } else {
                return null;
            }
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return null;
            } else {
                return null;
            }
        }
    }
}

export { JwtService };

export default new JwtService();
