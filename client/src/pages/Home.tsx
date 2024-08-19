import React, {useEffect} from 'react';
import MainContent from "../components/mainPage/MainContent.tsx";
import LeftPanel from "../components/mainPage/LeftPanel.tsx";

const Home: React.FC = () => {


    useEffect((): void => {
        // getStuffsAction(page)
        // }, [page]);
    }, []);

    useEffect(() => {
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