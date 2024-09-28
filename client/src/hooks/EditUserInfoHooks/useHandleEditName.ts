import React, { useContext, useEffect, useState } from "react";
import { useTypedSelector } from "../../../../buffer/client/src/hooks/reduxHooks/useTypedSelector.ts";
import { useActions } from "../../../../buffer/client/src/hooks/reduxHooks/useActions.ts";
import verifyEditName from "../../util/Verification/EditUserInfo/verifyEditName";
import { EditUserInfoContext, EditUserInfoContextType } from "../../contexts/EditUserInfoContext";

export default function useHandleEditName(name: string, clear: () => void) {
    const { setMessage } = useContext<EditUserInfoContextType>(EditUserInfoContext);

    const [error, setError] = useState<string>("");
    
    //! Патом переделать под redux toolkit

    const { loading: nameLoading, error: nameError } = useTypedSelector(state => state.nameForm);
    const { editName } = useActions();

    const handleEditName = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const verifyResponse = verifyEditName(name);
        if (verifyResponse) {
            setError(verifyResponse.nameError);

            clear();
        }

        if (name && !verifyResponse) {
            await editName(name);

            clear();
        }
    };

    useEffect(() => {
        setError(nameError ?? "");
    }, [nameError]);

    return {
        nameLoading,
        error,
        handleEditName
    };
}
