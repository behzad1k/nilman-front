import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./reducers/userSlice.ts";
import tweakReducer from "./reducers/tweakSlice.ts";

const rootReducer = combineReducers({
  userReducer,
  tweakReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
