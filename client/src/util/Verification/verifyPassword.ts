
export default function verifyPassword(password: string): {passwordError: string} | null {

    if (!password) {
        return { passwordError: "Не указан пароль" };
    }

    if (password.length < 6) {
        return { passwordError: "Пароль должен содержать не менее 6 символов" };
    }

    if (password.length > 16) {
        return { passwordError: "Пароль должен содержать не более 16 символов" };
    }

    // Проверка на наличие хотя бы одной заглавной буквы
    const hasUpperCase = /[A-Z]/.test(password);
    if (!hasUpperCase) {
        return { passwordError: "Пароль должен содержать хотя бы одну заглавную букву" };
    }

    // Проверка на наличие хотя бы трех чисел
    const hasThreeDigits = /.*\d.*\d.*\d/.test(password);
    if (!hasThreeDigits) {
        return { passwordError: "Пароль должен содержать хотя бы три числа" };
    }

    // Проверка на наличие хотя бы одного специального символа
    const hasSpecialCharacter = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?№]/.test(password);
    if (!hasSpecialCharacter) {
        return { passwordError: "Пароль должен содержать хотя бы один специальный символ" };
    }

    // Проверка на наличие только латинских букв
    const isLatinOnly = /^[A-Za-z0-9!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?№]+$/.test(password);
    if (!isLatinOnly) {
        return { passwordError: "Пароль должен содержать только латинские буквы и допустимые символы" };
    }

    return null
}