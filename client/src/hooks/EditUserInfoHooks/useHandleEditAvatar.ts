import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../useTypedSelector.ts";
import {useActions} from "../useActions.ts";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.ts";
import verifyAvatar from "../../util/Verification/verifyAvatar.ts";
import verifyEditAvatar from "../../util/Verification/EditUserInfo/verifyEditAvatar.ts";
import {EditUserInfoContext, EditUserInfoContextType} from "../../contexts/EditUserInfoContext.ts";

export default function useHandleEditAvatar(avatar: File | null, clear: () => void) {
    const {
        setMessage
    } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("")

    const {loading: avatarLoading, error: avatarError} = useTypedSelector(state => state.avatarForm);
    const {editAvatar} = useActions();


    const handleEditAvatar = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage("")

        const verifyResponse: { avatarError: string } | null = verifyEditAvatar(avatar);
        if (verifyResponse) {
            setError(verifyResponse.avatarError)

            clear()
        }


        if (avatar && !verifyResponse) {
            const imageFormData = new FormData();
            imageFormData.append('avatar', avatar);

            await editAvatar(imageFormData)

            clear()
        }

    };

    useEffect(() => {
        setError(avatarError)
    }, [avatarError]);

    return {
        handleEditAvatar,
        avatarLoading,
        error
    };
}