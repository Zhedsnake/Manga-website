import React, {useContext, useEffect} from 'react';
import {Tokens} from "../util/setTocken.ts";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {AuthContext, AuthContextType} from "../context";
import {useActions} from "../hooks/useActions.ts";

interface childrenProp {
    children: React.ReactNode;
}

const UpdateUserToken : React.FC<childrenProp> = ({children}) => {
    const {
        isUser,
        setTokenOutdated
    } = useContext<AuthContextType>(AuthContext);

    const { userToken: updatedUserToken, error: userTokenError } = useTypedSelector(state => state.updateUserToken);
    const { updateUserToken, defUpdateUserToken } = useActions();

    useEffect(() => {
        if (isUser) {
            updateUserToken()
        }
    }, []);

    useEffect(() => {
        if (updatedUserToken) {
            localStorage.setItem(Tokens.userToken, updatedUserToken);

            defUpdateUserToken()
        }
    }, [updatedUserToken]);

    useEffect(() => {
        if (userTokenError) {
            if (userTokenError === "Токен устарел") {
                localStorage.removeItem(Tokens.userToken)
                setTokenOutdated(true);
            }
        }
    }, [userTokenError]);

    return (
        <>
            {children}
        </>
    );
};

export default UpdateUserToken;