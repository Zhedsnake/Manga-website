import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../useTypedSelector.ts";
import {useActions} from "../useActions.ts";
import verifyEditAvatar from "../../util/Verification/EditUserInfo/verifyEditAvatar.ts";
import {EditUserInfoContext} from "../../contexts/EditUserInfoContext.ts";

export default function useHandleEditAvatar(avatar: File | null, clear: () => void) {
    const { setMessage } = useContext(EditUserInfoContext);

    const [error, setError] = useState<string>("");
    const { loading: avatarLoading, error: avatarError } = useTypedSelector(state => state.avatarForm);
    const { editAvatar } = useActions();

    const handleEditAvatar = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const verifyResponse = await verifyEditAvatar(avatar);
        if (verifyResponse) {
            setError(verifyResponse.avatarError);
            clear();
            return;
        }

        if (avatar) {
            const imageFormData = new FormData();
            imageFormData.append("avatar", avatar);

            await editAvatar(imageFormData);
            clear();
        }
    };

    useEffect(() => {
        if (avatarError) {
            setError(avatarError);
        }
    }, [avatarError]);

    return {
        handleEditAvatar,
        avatarLoading,
        error,
    };
}
