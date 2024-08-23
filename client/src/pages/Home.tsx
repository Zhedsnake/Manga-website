import React, {useEffect} from 'react';
import MainContent from "../components/mainPage/MainContent.tsx";
import LeftPanel from "../components/mainPage/LeftPanel.tsx";
import {useActions} from "../hooks/useActions.ts";

const Home: React.FC = () => {


    const { updateUserToken } = useActions();

    useEffect((): void => {
        // getStuffsAction(page)
        // }, [page]);
    }, []);

    useEffect(() => {
        updateUserToken()

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