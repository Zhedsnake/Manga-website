import verifyEmail from "../verifyEmail.ts";

export default function verifyEditEmail(email: string): {error: string} | null {

    const verificationResponse = verifyEmail(email)
    if (verificationResponse) {
        return verificationResponse
    }

    return null;
}