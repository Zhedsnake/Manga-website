import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../useTypedSelector.ts";
import {useActions} from "../useActions.ts";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.ts";
import verifyPassword from "../../util/Verification/verifyPassword.ts";
import verifyEditPassword from "../../util/Verification/EditUserInfo/verifyEditPassword.ts";
import {EditUserInfoContext, EditUserInfoContextType} from "../../contexts/EditUserInfoContext.ts";

export default function useHandleEditPassword(oldPassword, newPassword, oldClear, newClear) {
    const {
        setMessage
    } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("")

    const {loading: passwordLoading, error: passwordError} = useTypedSelector(state => state.passwordForm);
    const {editPassword} = useActions();

    const handleEditPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("")

        const verificationResponse:{passwordError: string} | null | undefined = verifyEditPassword(oldPassword, newPassword)
        if (verificationResponse) {

            setError(verificationResponse.passwordError);

            oldClear()
            newClear()
        }

        if (oldPassword && newPassword && !verificationResponse) {
            await editPassword(oldPassword, newPassword);

            oldClear()
            newClear()
        }
    }

    useEffect(() => {
        setError(passwordError)
    }, [passwordError]);

    return {
        passwordLoading,
        error,
        handleEditPassword
    };
}