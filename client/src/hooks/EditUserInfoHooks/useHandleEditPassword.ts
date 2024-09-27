import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useTypedSelector.ts";
import {useActions} from "../../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useActions.ts";
import verifyEditPassword from "../../util/Verification/EditUserInfo/verifyEditPassword.ts";
import {EditUserInfoContext, EditUserInfoContextType} from "../../contexts/EditUserInfoContext.ts";

export default function useHandleEditPassword(oldPassword: string, newPassword: string, oldClear: () => void, newClear: () => void) {
    const {
        setMessage
    } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("")

    const {loading: passwordLoading, error: passwordError} = useTypedSelector(state => state.passwordForm);
    const {editPassword} = useActions();

    const handleEditPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("")

        const verificationResponse:{passwordError: string} | null = verifyEditPassword(oldPassword, newPassword)
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
        setError(passwordError ?? "")
    }, [passwordError]);

    return {
        passwordLoading,
        error,
        handleEditPassword
    };
}