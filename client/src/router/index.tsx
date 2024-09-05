import React from "react";
import Home from "../pages/Home.tsx";
import UploadNewManga from "../pages/UploadNewManga.tsx";
import Auth from "../pages/Auth.tsx";
import UserProfile from "../pages/UserProfile.tsx";
import EditUserProfile from "../pages/EditUserProfile.tsx";



export interface RoutesTypes {
    path: string,
    component: React.ReactNode
}

const commonRoutes: RoutesTypes[] = [
    {path: '/', component: <Home />},
]

const privateRoutes: RoutesTypes[] = [
    ...commonRoutes,
    {path: '/user-profile', component: <UserProfile />},
    {path: '/edit-user-profile', component: <EditUserProfile />},
]

const publicRoutes: RoutesTypes[] = [
    ...commonRoutes,
    {path: '/auth', component: <Auth />},
]

export {privateRoutes, publicRoutes};

