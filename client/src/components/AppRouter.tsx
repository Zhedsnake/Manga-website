import React, {useContext} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {privateRoutes, publicRoutes} from "../router";
import {AuthContext, AuthContextType} from "../contexts/AuthContext.ts";
import Loader from "./UI/Loader/Loader.tsx";


const AppRouter: React.FC = () => {
    const {isUser, isAuthLoading} = useContext<AuthContextType>(AuthContext);

    if (isAuthLoading) {
        return <Loader/>
    }

    return (
        isUser
            ?
            <BrowserRouter>
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            element={route.component}
                            path={route.path}
                            key={route.path}
                        />
                    )}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
            :
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            element={route.component}
                            path={route.path}
                            key={route.path}
                        />
                    )}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
    );
};

export default AppRouter;