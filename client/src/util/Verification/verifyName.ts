
export default function verifyName(name: string): {nameError: string} | null {

    if (!name) {
        return { nameError: "Не указано имя" };
    }

    if (name.length < 4) {
        return { nameError: "Имя должно содержать не менее 4 символов" };
    }

    if (name.length > 10) {
        return { nameError: "Имя должно содержать не более 10 символов" };
    }

    return null;
}