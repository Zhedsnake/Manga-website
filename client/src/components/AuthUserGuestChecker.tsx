import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {useActions} from "../hooks/useActions.ts";

interface AuthProp {
    children: React.ReactNode;
}

const AuthUserGuestChecker: React.FC<AuthProp> = ({children}) => {
    const {
        setAuthLoading,
        setIsUser
    } = useContext(AuthContext);


    const { guestToken: guestTokenResponse, error: guestTokenError } = useTypedSelector(state => state.getGuestToken);
    const { getGuestToken } = useActions();

    useEffect(() => {
        const userToken: string | null = localStorage.getItem('userToken');
        const guestToken: string | null = localStorage.getItem('guestToken');

        (async function () {
            // if (userToken {
            //
            // } else
            if (guestToken) {
                setIsUser(true)
            } else if (!guestToken) {
                setAuthLoading(true)
                await getGuestToken()

                if (!guestTokenError) {
                    setIsUser(true)
                } else if (guestTokenError) {
                    console.error(guestTokenError)
                }

                setAuthLoading(false);
            }
        })()

    }, [])

    useEffect(() => {
        if (guestTokenResponse) {
            localStorage.setItem("guestToken", guestTokenResponse);
        }
    }, [guestTokenResponse]);

    return (
        <>
            {children}
        </>
    );
};

export default AuthUserGuestChecker;