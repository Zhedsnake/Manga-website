import verifyPassword from "../verifyPassword";

export default function verifyEditPassword(oldPassword: string, newPassword: string): {passwordError: string} | null {

    if (!oldPassword) {
        return {passwordError: "Не указан старый пароль"}
    }

    if (!newPassword) {
        return {passwordError: "Не указан новый пароль"}
    }

    if (oldPassword === newPassword) {
        return { passwordError: 'Новый пароль не должен совпадать со старым' };
    }

    const verificationResponse:{passwordError: string} | null | undefined = verifyPassword(newPassword)
    if (verificationResponse) {
        return verificationResponse;
    }

    return null
}