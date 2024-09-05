import verifyName from "../Verification/verifyName.ts";
import verifyPassword from "../Verification/verifyPassword.ts";

export default function verifyLogin(name: string, password: string): {loginError: string} | { nameError: string } | { passwordError: string } | null {

    if (!name || !password) {
        return {loginError: "Пожалуста, заполните все поля"}
    }

    const verificationNameResponse = verifyName(name)
    if (verificationNameResponse) {
        return verificationNameResponse
    }

    const verificationPasswordResponse = verifyPassword(password)
    if (verificationPasswordResponse) {
        return verificationPasswordResponse
    }


    return null;
}