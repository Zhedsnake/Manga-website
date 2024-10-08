import verifyName from "../Verification/verifyName";
import verifyPassword from "../Verification/verifyPassword";
import verifyEmail from "../Verification/verifyEmail";

export default function verifyReg(name: string, email: string, password: string): {regError: string} | { nameError: string } | { emailError: string } | { passwordError: string } | null {

    if (!name || !email || !password) {
        return {regError: "Пожалуста, заполните все поля"}
    }

    const verificationNameResponse = verifyName(name)
    if (verificationNameResponse) {
        return verificationNameResponse
    }

    const verificationEmailResponse = verifyEmail(email)
    if (verificationEmailResponse) {
        return verificationEmailResponse
    }

    const verificationPasswordResponse = verifyPassword(password)
    if (verificationPasswordResponse) {
        return verificationPasswordResponse;
    }


    return null;
}