import verifyAvatar from "../verifyAvatar";

export default async function verifyEditAvatar(avatar: File | null): Promise<{avatarError: string} | null> {

    const verificationResponse = await verifyAvatar(avatar)
    if (verificationResponse) {
        return verificationResponse
    }

    return null;
}