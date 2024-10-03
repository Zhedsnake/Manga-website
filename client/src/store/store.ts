import {configureStore} from "@reduxjs/toolkit";
// import {postAPI} from "../services/PostService";
import {rootReducer} from "./reducers";

const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                // .concat(postAPI.middleware)
    })
}

export default setupStore;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
