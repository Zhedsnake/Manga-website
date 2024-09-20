import verifyEmail from "../verifyEmail";

export default function verifyEditEmail(email: string): {emailError: string} | null {

    const verificationResponse = verifyEmail(email)
    if (verificationResponse) {
        return verificationResponse
    }

    return null;
}