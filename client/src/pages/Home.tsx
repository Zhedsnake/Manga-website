import React, {useContext, useEffect} from 'react';
import MainContent from "../components/mainPage/MainContent.tsx";
import LeftPanel from "../components/mainPage/LeftPanel.tsx";
import {useActions} from "../hooks/useActions.ts";
import {AuthContext, AuthContextType} from "../context";

const Home: React.FC = () => {
    const {
        isUser
    } = useContext<AuthContextType>(AuthContext);

    const { updateUserToken } = useActions();

    useEffect((): void => {
        // getStuffsAction(page)
        // }, [page]);
    }, []);

    useEffect(() => {
        if (isUser) {
            updateUserToken()
        }

        return () => {
            // defStuffs()
        };
    }, []);

    return (
        <div className="container">
            <div className="row">
                <MainContent/>
                <LeftPanel/>
            </div>
        </div>
    );
};

export default Home;