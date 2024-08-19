import React, {useContext, useEffect} from 'react';
import {AuthContext, AuthContextType} from "../context";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {useActions} from "../hooks/useActions.ts";
import {setToken} from "../util/setTocken.ts";
import {Tokens} from "../util/setTocken.ts";

interface AuthProp {
    children: React.ReactNode;
}

const AuthUserGuestChecker: React.FC<AuthProp> = ({children}) => {
    const {
        setAuthLoading,
        setIsGuest,
        setIsUser
    } = useContext<AuthContextType>(AuthContext);


    const { guestToken: guestTokenResponse, error: guestTokenError } = useTypedSelector(state => state.getGuestToken);
    const { getGuestToken, defGuestToken } = useActions();

    useEffect(() => {
        const userToken: boolean = !!localStorage.getItem(Tokens.userToken);
        const guestToken: boolean = !!localStorage.getItem(Tokens.guestToken);

        (async function () {
            if (userToken) {
                setIsUser(userToken)
            } else if (guestToken) {
                setIsGuest(guestToken)
            } else if (!guestToken) {
                setAuthLoading(true)
                await getGuestToken()

                if (!guestTokenError) {
                    defGuestToken()
                } else if (guestTokenError) {
                    console.error(guestTokenError)
                }

                setAuthLoading(false);
            }
        })()

    }, [])

    useEffect(() => {
        if (guestTokenResponse) {
            const tokenIsSet: boolean = setToken(Tokens.guestToken, guestTokenResponse);
            setIsGuest(tokenIsSet)
        }
    }, [guestTokenResponse]);

    return (
        <>
            {children}
        </>
    );
};

export default AuthUserGuestChecker;