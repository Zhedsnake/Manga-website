import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../../../../client/src/store/reducers";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
