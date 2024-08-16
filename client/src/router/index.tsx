import React from "react";
import Home from "../pages/home.tsx";



export interface RoutesTypes {
    path: string,
    component: React.ReactNode
}

const privateRoutes: RoutesTypes[] = [
    {path: '/', component: <Home />},
]

const publicRoutes: RoutesTypes[] = [
    {path: '/', component: <Home />},
]

export {privateRoutes, publicRoutes};

