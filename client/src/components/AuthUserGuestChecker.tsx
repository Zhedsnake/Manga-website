import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {useActions} from "../hooks/useActions.ts";

interface AuthProp {
    children: React.ReactNode;
}

const AuthUserGuestChecker: React.FC<AuthProp> = ({children}) => {
    const {
        setLoading,
        setIsUser
    } = useContext(AuthContext);


    const { guestToken: guestTokenResponse } = useTypedSelector(state => state.getGuestToken);
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
                setLoading(true)

                await getGuestToken()
                setIsUser(true)

                setLoading(false);
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