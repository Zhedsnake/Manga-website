
export default function verifyAvatar(avatar: File | null): {avatarError: string} | null {

    if (!avatar) {
        return {avatarError: "Вы не загрузили аватарку"};
    }

    if (avatar.size > 368000) { // 3.68 MB in bytes
        return {avatarError: "Размер файла не должен превышать 3.68 MB."};
    }

    if (avatar.type !== "image/jpeg" && avatar.type !== "image/png" && avatar.type !== "image/jpg") {
        return {avatarError: "Допустимые форматы jpeg, jpg или png"};
    }

    const img = new Image();
    img.src = URL.createObjectURL(avatar);

    img.onload = async () => {
        if (img.width !== img.height) {

            return {avatarError: "Изображение должно иметь соотношение сторон 1:1."};
        }
    };

    return null;
}