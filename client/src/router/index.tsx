import React from "react";
import Home from "../pages/Home.tsx";
import UploadNewManga from "../pages/UploadNewManga.tsx";



export interface RoutesTypes {
    path: string,
    component: React.ReactNode
}

const commonRoutes: RoutesTypes[] = [
    {path: '/', component: <Home />},
    {path: '/upload-new-manga', component: <UploadNewManga />},
]

const privateRoutes: RoutesTypes[] = [
    ...commonRoutes
]

const publicRoutes: RoutesTypes[] = [
    ...commonRoutes
]

export {privateRoutes, publicRoutes};

