import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useTypedSelector.ts";
import {useActions} from "../../../../buffer/client/src/__tests__/unit/hooks/reduxHooks/useActions.ts";
import verifyEmail from "../../util/Verification/verifyEmail.ts";
import {EditUserInfoContext, EditUserInfoContextType} from "../../contexts/EditUserInfoContext.ts";

export default function useHandleEditEmail(email: string, clear: () => void) {
    const { setMessage } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("");

    const { loading: emailLoading, error: emailError } = useTypedSelector(state => state.emailForm);
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
