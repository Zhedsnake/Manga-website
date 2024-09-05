import verifyAvatar from "../verifyAvatar.ts";

export default function verifyEditAvatar(avatar: File | null): {avatarError: string} | null {

    const verificationResponse = verifyAvatar(avatar)
    if (verificationResponse) {
        return verificationResponse
    }

    return null;
}