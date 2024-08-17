import React from "react";
import Home from "../pages/Home.tsx";
import UploadNewManga from "../pages/UploadNewManga.tsx";



export interface RoutesTypes {
    path: string,
    component: React.ReactNode
}

const privateRoutes: RoutesTypes[] = [
    {path: '/', component: <Home />},
    {path: '/upload-new-manga', component: <UploadNewManga />},
]

const publicRoutes: RoutesTypes[] = [
    {path: '/', component: <Home />},
    {path: '/upload-new-manga', component: <UploadNewManga />},
]

export {privateRoutes, publicRoutes};

