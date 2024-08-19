import React, {useContext} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import {privateRoutes, publicRoutes} from "../router";
import {AuthContext, AuthContextType} from "../context";


const AppRouter: React.FC = () => {
    const {isUser} = useContext<AuthContextType>(AuthContext);

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