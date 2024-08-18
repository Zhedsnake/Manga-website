import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context";
import {useTypedSelector} from "../hooks/useTypedSelector.ts";
import {useActions} from "../hooks/useActions.ts";

interface AuthProp {
    children: React.ReactNode;
}

const AuthUserGuestChecker: React.FC<AuthProp> = ({children}) => {
    const {
        setLoading
    } = useContext(AuthContext);


    const { guestToken, loading, error } = useTypedSelector(state => state.getGuestToken);
    const { getGuestToken } = useActions();

    useEffect(() => {
        const userToken: string | null = localStorage.getItem('userToken');
        const guestToken: string | null = localStorage.getItem('guestToken');

        (async function () {
            // if (userToken {
            //
            // } else if (guestToken) {
            //
            // } else if (!guestToken) {
            //
            // }
            if (!guestToken) {
                await getGuestToken()
            }
        })()

        setLoading(false);
    }, [])

    return (
        <>
            {children}
        </>
    );
};

export default AuthUserGuestChecker;