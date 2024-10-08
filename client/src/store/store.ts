import { configureStore } from "@reduxjs/toolkit";
// import { postAPI } from "../services/PostService";
import { rootReducer } from "./reducers";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    // .concat(postAPI.middleware)
});

export default store;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
