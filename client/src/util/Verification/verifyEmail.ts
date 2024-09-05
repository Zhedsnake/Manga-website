
export default function verifyEmail(email: string): {emailError: string} | null {

    if (!email) {
        return {emailError: "Не указано email"};
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return { emailError: "Некорректный формат email" };
    }

    return null
}