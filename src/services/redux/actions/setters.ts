import {SET_DATA, SET_TOKEN} from "../reducers/userSlice.ts";
import {IUserData} from "../../types.ts";
import {appDispatch} from "../store.ts";

export const setUserData = (userData: IUserData) => appDispatch(SET_DATA(userData))
export const setToken = (token: string) => appDispatch(SET_TOKEN(token))