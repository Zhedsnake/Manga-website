import React, {useContext, useEffect, useState} from "react";
import {useActions} from "../useActions";
import verifyEmail from "../../util/Verification/verifyEmail.ts";
import {EditUserInfoContext, EditUserInfoContextType} from "../../contexts/EditUserInfoContext.ts";
import {useAppSelector} from "../reduxHooks-toolkit/useRedux.ts";

export default function useHandleEditEmail(email: string, clear: () => void) {
    const { setMessage } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("");

    // const { loading: emailLoading, error: emailError } = useTypedSelector(state => state.emailForm);
    const { loading: emailLoading, error: emailError } = useAppSelector(state => state.emailForm);
    const { editEmail } = useActions();

    const handleEditEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const verifyResponse: { emailError: string } | null = verifyEmail(email);
        if (verifyResponse) {
            setError(verifyResponse.emailError);

            clear();
        }

        if (email && !verifyResponse) {
            await editEmail(email);
            clear();
        }
    };

    useEffect(() => {
        setError(emailError ?? "");
    }, [emailError]);

    return {
        emailLoading,
        error,
        handleEditEmail,
    };
}
