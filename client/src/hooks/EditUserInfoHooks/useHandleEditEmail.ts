import React, {useContext, useEffect, useState} from "react";
import {useTypedSelector} from "../useTypedSelector.ts";
import {useActions} from "../useActions.ts";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.ts";
import verifyEmail from "../../util/Verification/verifyEmail.ts";
import {EditUserInfoContext, EditUserInfoContextType} from "../../contexts/EditUserInfoContext.ts";

export default function useHandleEditEmail(email, clear) {
    const {
        setMessage
    } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState("")

    const {loading: emailLoading, error: emailError} = useTypedSelector(state => state.emailForm);
    const {editEmail} = useActions();

    const handleEditEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("")


        const verifyResponse: { emailError: string } | null = verifyEmail(email);
        if (verifyResponse) {
            setError(verifyResponse.emailError)

            clear()
        }

        if (email && !verifyResponse) {
            await editEmail(email);

            clear()
        }

    }

    useEffect(() => {
        setError(emailError)
    }, [emailError]);

    return {
        emailLoading,
        error,
        handleEditEmail
    };
}