import { getSmallUserInfoByTokenReducer } from "../../../../../../../client/src/store/reducers/getSmallUserInfoByTokenReducer";
import { GetSmallUserInfoActionTypes, GetSmallUserInfoAction } from "../../../../../../../client/src/types/getSmallUserInfo";

const initialState = {
  data: {
    name: "",
    pic: ""
  },
  loading: false,
  error: null
};

describe("getSmallUserInfoByTokenReducer", () => {

  test("должен возвращать начальное состояние по умолчанию", () => {
    const newState = getSmallUserInfoByTokenReducer(undefined, {} as GetSmallUserInfoAction);
    expect(newState).toEqual(initialState);
  });

  test("должен обрабатывать SMALL_USER_INFO", () => {
    const action: GetSmallUserInfoAction = { type: GetSmallUserInfoActionTypes.SMALL_USER_INFO };
    const expectedState = {
      ...initialState,
      loading: true
    };

    const newState = getSmallUserInfoByTokenReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test("должен обрабатывать SMALL_USER_INFO_SUCCESS", () => {
    const action: GetSmallUserInfoAction = {
      type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_SUCCESS,
      payload: { name: "John Doe", pic: "profile.jpg" }
    };
    const expectedState = {
      data: { name: "John Doe", pic: "profile.jpg" },
      loading: false,
      error: null
    };

    const newState = getSmallUserInfoByTokenReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test("должен обрабатывать SMALL_USER_INFO_ERROR", () => {
    const action: GetSmallUserInfoAction = {
      type: GetSmallUserInfoActionTypes.SMALL_USER_INFO_ERROR,
      payload: "Error message"
    };
    const expectedState = {
      ...initialState,
      loading: false,
      error: "Error message"
    };

    const newState = getSmallUserInfoByTokenReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test("должен обрабатывать DEF_SMALL_USER_INFO", () => {
    const action: GetSmallUserInfoAction = { type: GetSmallUserInfoActionTypes.DEF_SMALL_USER_INFO };
    const currentState = {
      data: { name: "John", pic: "john.jpg" },
      loading: true,
      error: "Some error"
    };

    const newState = getSmallUserInfoByTokenReducer(currentState, action);
    expect(newState).toEqual(initialState);
  });
});
