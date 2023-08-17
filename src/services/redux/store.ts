import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from "./reducers/serviceSlice.ts";
import userReducer from "./reducers/userSlice.ts";

const rootReducer = combineReducers({
  userReducer,
  serviceReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: false,
}),
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>()

