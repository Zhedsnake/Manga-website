import jwt, {JwtPayload} from 'jsonwebtoken';

class JwtService {
    private secret: string;

    constructor() {
        const jwt_secret: string | undefined = process.env.JWT_SECRET;
        if (!jwt_secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        this.secret = jwt_secret;
    }


    getGuestToken(payload: { guest: { id: string } }): string {
        const token: string = jwt.sign(payload, this.secret);
        return token;
    }

    getUserToken(payload: { user: { id: string } }): string {
        const token: string = jwt.sign(payload, this.secret, { expiresIn: "30d" });
        return token;
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
            if (err instanceof jwt.TokenExpiredError) {
                return null;
            } else {
                return null;
            }
        }
    }
}

export default new JwtService();
