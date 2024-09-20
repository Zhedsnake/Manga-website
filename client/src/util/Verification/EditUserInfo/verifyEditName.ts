
import verifyName from "../verifyName";

export default function verifyEditName(name: string): {nameError: string} | null {

    const verificationResponse = verifyName(name)
    if (verificationResponse) {
        return verificationResponse
    }

    return null;
}