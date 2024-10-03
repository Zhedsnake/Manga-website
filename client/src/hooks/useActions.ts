import {bindActionCreators} from "redux";
import ActionCreators from '../store/action-creators'
import {useAppDispatch} from "./reduxHooks-toolkit/useRedux.ts";

export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(ActionCreators, dispatch)
}
