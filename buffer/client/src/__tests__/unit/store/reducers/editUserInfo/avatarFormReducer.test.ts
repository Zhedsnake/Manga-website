import { avatarFormReducer } from "../../../../../../../../client/src/store/reducers/editUserInfo/avatarFormReducer";
import { AvatarActionTypes, AvatarAction, EditAvatarState } from "../../../../../../../../client/src/types/editUserInfo/avatarForm";

describe('avatarFormReducer', () => {
    const initialState: EditAvatarState = {
        message: "",
        loading: false,
        error: null
    };

    test('должен возвращать начальное состояние по умолчанию', () => {
        const newState = avatarFormReducer(undefined, {} as AvatarAction);
        expect(newState).toEqual(initialState);
    });

    test('должен обрабатывать EDIT_AVATAR', () => {
        const action: AvatarAction = {
            type: AvatarActionTypes.EDIT_AVATAR,
        };

        const expectedState = {
            message: "",
            loading: true,
            error: null
        };

        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_AVATAR_SUCCESS', () => {
        const action: AvatarAction = {
            type: AvatarActionTypes.EDIT_AVATAR_SUCCESS,
            payload: "Avatar updated successfully"
        };

        const expectedState = {
            message: "Avatar updated successfully",
            loading: false,
            error: null
        };

        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать EDIT_AVATAR_ERROR', () => {
        const action: AvatarAction = {
            type: AvatarActionTypes.EDIT_AVATAR_ERROR,
            payload: "Error updating avatar"
        };

        const expectedState = {
            message: "",
            loading: false,
            error: "Error updating avatar"
        };

        const newState = avatarFormReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test('должен обрабатывать DEF_EDIT_AVATAR и сбрасывать состояние', () => {
        const action: AvatarAction = {
            type: AvatarActionTypes.DEF_EDIT_AVATAR,
        };

        const currentState: EditAvatarState = {
            message: "Avatar updated",
            loading: true,
            error: "Some error"
        };

        const newState = avatarFormReducer(currentState, action);
        expect(newState).toEqual(initialState);
    });
});
