import jwt from 'jsonwebtoken';

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
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { guest?: { id: string }, user?: { id: string } };

        if (decoded.guest) {
            return decoded.guest.id;
        } else if (decoded.user) {
            return decoded.user.id;
        } else {
            return null;
        }
    }
}

export default new JwtService();
